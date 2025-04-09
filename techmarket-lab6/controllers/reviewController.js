// Plik: controllers/taskController.js

// Importujemy model, bo kontroler będzie operował na danych
const Task = require('../models/Task');

/**
 * @desc    Pobiera wszystkie zadania
 * @route   GET /api/tasks
 * @access  Public
 */
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    console.error('Błąd podczas pobierania zadań:', error);
    res.status(500).json({ success: false, error: 'Błąd serwera' });
  }
};

/**
 * @desc    Pobiera pojedyncze zadanie po ID
 * @route   GET /api/tasks/:id
 * @access  Public
 */
const getTaskById = async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ success: false, error: `Nie znaleziono zadania o ID ${taskId}` });
    }
    res.status(200).json({ success: true, data: task });
  } catch (error) {
    console.error('Błąd podczas pobierania zadania po ID:', error);
    if (error.name === 'CastError') {
      return res.status(404).json({ success: false, error: `Niepoprawny format ID: ${req.params.id}` });
    }
    res.status(500).json({ success: false, error: 'Błąd serwera' });
  }
};

/**
 * @desc    Tworzy nowe zadanie
 * @route   POST /api/tasks
 * @access  Public
 */
const createTask = async (req, res) => {
  try {
    // Dane nowego zadania są w req.body (dzięki express.json() middleware)
    const task = await Task.create(req.body);
    res.status(201).json({ success: true, data: task });
  } catch (error) {
    console.error('Błąd podczas tworzenia zadania:', error);
    // Lepsza obsługa błędów walidacji Mongoose
    if (error.name === 'ValidationError') {
      // Zbieramy komunikaty błędów walidacji dla poszczególnych pól
      const messages = Object.values(error.errors).map(val => val.message);
      return res.status(400).json({ success: false, error: messages });
    }
    // Inne błędy (np. problem z połączeniem) traktujemy jako 400 lub 500
    // Zwrócenie 400 (Bad Request) jest często uzasadnione przy tworzeniu zasobu
    res.status(400).json({ success: false, error: error.message || 'Nie udało się utworzyć zadania' });
  }
};

// Eksportujemy wszystkie zdefiniowane funkcje kontrolera
module.exports = {
  getAllTasks,
  getTaskById,
  createTask
  // W przyszłości dodamy tu: updateTask, deleteTask
};