const Lesson = require('../models/lessonModel');
const Group = require('../models/groupModel');
const Teacher = require('../models/teacherModel');
const LessonType = require('../models/lessonTypeModel');
const Major = require('../models/majorModel');
const { Sequelize, Op } = require('sequelize');

// Helper function to generate all lesson dates with strict term boundaries
const generateLessonDates = async (lessonData) => {
  const { start, end, frequency, term, group_id } = lessonData;

  const initialDate = new Date(start);

  let termStart, termEnd;
  const year = initialDate.getFullYear();

  if (term === 'winter') {
    termStart = new Date(`${year}-10-01T00:00:00`);
    termEnd = new Date(`${year + 1}-01-30T23:59:59`);
  } else {
    termStart = new Date(`${year}-02-24T00:00:00`);
    termEnd = new Date(`${year}-06-20T23:59:59`);
  }

  const lessonStart = new Date(Math.max(initialDate, termStart));


  if (lessonStart > termEnd) {
    return [];
  }

  const dayOfWeek = lessonStart.getDay();

  const dates = [];
  let currentDate = new Date(lessonStart);

  while (currentDate <= termEnd) {
    dates.push(new Date(currentDate));

    const incrementDays = frequency === 'weekly' ? 7 : 14;
    currentDate.setDate(currentDate.getDate() + incrementDays);

    while (currentDate.getDay() !== dayOfWeek && currentDate <= termEnd) {
      currentDate.setDate(currentDate.getDate() + 1);
    }
  }

  const lessonRecords = dates.map(date => {
    const lessonStartTime = new Date(date);
    lessonStartTime.setHours(
      new Date(start).getHours(),
      new Date(start).getMinutes(),
      new Date(start).getSeconds()
    );

    const lessonEndTime = new Date(date);
    lessonEndTime.setHours(
      new Date(end).getHours(),
      new Date(end).getMinutes(),
      new Date(end).getSeconds()
    );

    return {
      ...lessonData,
      start: lessonStartTime,
      end: lessonEndTime,
      createdAt: new Date(),
      updatedAt: new Date()
    };
  });

  if (lessonRecords.length > 0) {
    await Lesson.bulkCreate(lessonRecords);
  }

  return lessonRecords;
};

// Create a new lesson (and generate all occurrences)
exports.createLesson = async (req, res) => {
  const { room, title, start, end, teacher_id, lesson_type_id, group_id, frequency, term } = req.body;

  try {
    if (!title || !start || !end || !frequency || !term) {
      return res.status(400).json({
        message: 'Tytuł, data rozpoczęcia, zakończenia, częstotliwość i semestr są wymagane'
      });
    }

    // Validate term dates
    const startDate = new Date(start);
    const termYear = startDate.getFullYear();

    let termStart, termEnd;
    if (term === 'winter') {
      termStart = new Date(`${termYear}-10-01`);
      termEnd = new Date(`${termYear + 1}-01-30`);
    } else {
      termStart = new Date(`${termYear}-02-24`);
      termEnd = new Date(`${termYear}-06-20`);
    }

    if (startDate < termStart || startDate > termEnd) {
      return res.status(400).json({
        message: `Data rozpoczęcia zajęć musi mieścić się w semestrze (${termStart.toLocaleDateString()} - ${termEnd.toLocaleDateString()})`
      });
    }

    // Generate all lesson dates (including the first one)
    const generatedLessons = await generateLessonDates({
      room,
      title,
      start,
      end,
      teacher_id,
      lesson_type_id,
      group_id,
      frequency,
      term
    });

    if (generatedLessons.length === 0) {
      return res.status(400).json({
        message: 'Nie udało się wygenerować zajęć w podanym semestrze'
      });
    }

    // The first generated lesson will serve as our "template"
    const firstLesson = generatedLessons[0];

    return res.status(201).json({
      message: 'Zajęcia zostały utworzone pomyślnie',
      firstLesson: firstLesson,
      generatedLessons: generatedLessons.length,
      termPeriod: `${termStart.toLocaleDateString()} - ${termEnd.toLocaleDateString()}`
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Błąd podczas tworzenia zajęć' });
  }
};

// Get all lessons
exports.getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.findAll({
      include: [
        { model: Teacher, attributes: ['name'] },
        { model: LessonType, attributes: ['name'] },
        { model: Group, attributes: ['group_number', 'group_name', 'start_year'] },
      ],
    });
    return res.status(200).json(lessons);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Błąd podczas pobierania zajęć' });
  }
};

// Get single lesson by ID
exports.getLessonById = async (req, res) => {
  const { id } = req.params;

  try {
    const lesson = await Lesson.findByPk(id, {
      include: [
        { model: Teacher, attributes: ['name'] },
        { model: LessonType, attributes: ['name'] },
        { model: Group, attributes: ['group_number', 'group_name', 'start_year'] },
      ],
    });

    if (!lesson) {
      return res.status(404).json({ message: 'Zajęcia nie zostały znalezione' });
    }

    return res.status(200).json(lesson);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Błąd podczas pobierania zajęć' });
  }
};

// Update a lesson
exports.updateLesson = async (req, res) => {
  const { id } = req.params;
  const { room, title, start, end, teacher_id, lesson_type_id, group_id, frequency, term } = req.body;

  try {
    const lesson = await Lesson.findByPk(id);

    if (!lesson) {
      return res.status(404).json({ message: 'Zajęcia nie zostały znalezione' });
    }

    await lesson.update({
      room,
      title,
      start,
      end,
      teacher_id,
      lesson_type_id,
      group_id,
      frequency,
      term
    });

    return res.status(200).json({ message: 'Zajęcia zostały zaktualizowane', lesson });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Błąd podczas aktualizacji zajęć' });
  }
};

// Delete a lesson
exports.deleteLesson = async (req, res) => {
  const { id } = req.params;

  try {
    const lesson = await Lesson.findByPk(id);

    if (!lesson) {
      return res.status(404).json({ message: 'Zajęcia nie zostały znalezione' });
    }

    await lesson.destroy();

    return res.status(200).json({ message: 'Zajęcia zostały usunięte' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Błąd podczas usuwania zajęć' });
  }
};

// Get lessons for a specific group on a given date
exports.getLessonsByDateAndGroup = async (req, res) => {
  const { date, group_id } = req.params;

  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    return res.status(400).json({ message: 'Niepoprawny format daty' });
  }

  try {
    const lessons = await Lesson.findAll({
      where: {
        group_id: group_id,
        start: {
          [Sequelize.Op.gte]: new Date(parsedDate.setHours(0, 0, 0, 0)),
        },
        end: {
          [Sequelize.Op.lte]: new Date(parsedDate.setHours(23, 59, 59, 999)),
        }
      },
      include: [
        { model: Teacher, attributes: ['name'] },
        { model: LessonType, attributes: ['name'] },
        {
          model: Group,
          attributes: ['group_number', 'start_year', 'group_name'],
          include: [
            {
              model: Major,
              attributes: ['name'],
            }
          ]
        }
      ]
    });

    if (lessons.length === 0) {
      return res.status(404).json({ message: 'Brak zajęć dla tej grupy w wybranym dniu' });
    }

    return res.status(200).json(lessons);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Błąd podczas pobierania zajęć' });
  }
};