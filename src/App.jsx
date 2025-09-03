import * as React from 'react';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Container, Stack, Box, Button, Modal } from '@mui/material';
import Header from './components/header';
import Filters from './components/filters';
import SearchBar from './components/searchBar';
import TodoList from './components/todoList';
import AddTodoButton from './components/addTodoButton/index.jsx';
import TodoForm from './components/todoForm/index.jsx';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';


const mainTheme = createTheme({
  palette: {
    primary: {
      main: "#6750A4",
      contrastText: "#fff",
    },
    secondary: {
      main: "#6750A40D",
    },
    text: {
      primary: "#1D1B1E",
    },
    background: {
      default: '#FFFBFF',
      paper: '#F7F2FA',
    },
    divider: '#79747E',
  },
  typography: {
    fontFamily: "Inter",
    fontStyle: "normal",
    h1: {
      fontSize: 20,
      fontWeight: 500,
    },
    h2: {
      fontSize: 14,
      fontWeight: 500,
      letterSpacing: 0.1,
      lineHeight: 1.4,
    },
    body1: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: '100%',
    },
    body2: {
      fontSize: 14,
      fontWeight: 400,
      lineHeight: '100%',
    },
  },
  spacing: 8,
});

const modalStyle = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  width: '100%',
  bgcolor: 'background.paper',
  borderTopLeftRadius: '28px',
  borderTopRightRadius: '28px',
  boxShadow: 24,
  p: 2,
  margin: '0 auto',
  maxWidth: (theme) => theme.breakpoints.values.sm,
};

function App() {
  const { i18n } = useTranslation();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [editingTodo, setEditingTodo] = React.useState(null);
  const [filter, setFilter] = React.useState('all');
  const [todos, setTodos] = React.useState(() => {
    try {
      const savedTodos = localStorage.getItem('todos');
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
      console.error("Could not parse todos from localStorage", error);
      return [];
    }
  });

  React.useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  React.useEffect(() => {
    const now = dayjs();
    const updatedTodos = todos.map(todo => {
      // Перевіряємо, чи є у завдання дата, чи воно ще не виконане,
      // і чи ця дата вже в минулому
      if (todo.date && !todo.completed && dayjs(todo.date, 'YYYY-MM-DD HH:mm').isBefore(now)) {
        // Якщо так, повертаємо копію завдання зі зміненим статусом
        return { ...todo, completed: true };
      }
      // Інакше повертаємо завдання без змін
      return todo;
    });

    setTodos(updatedTodos);
  }, []); // Пустий масив залежностей означає, що ефект виконається 1 раз при монтуванні

  const addTodo = (text, date, shouldRemind) => {
    const newTodo = { id: Date.now(), text, date, completed: false, shouldRemind };
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const updateTodo = (id, text, date, shouldRemind) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, text, date, shouldRemind } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleOpenAddModal = () => {
    setEditingTodo(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (todo) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  const filteredTodos = React.useMemo(() => {
    const byStatus = todos.filter(todo => {
      if (filter === 'active') {
        return !todo.completed;
      }
      if (filter === 'completed') {
        return todo.completed;
      }
      return true;
    });

    if (!searchQuery) {
      return byStatus;
    }
    return byStatus.filter(todo => todo.text.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [todos, filter, searchQuery]);

  return (
    <ThemeProvider theme={mainTheme}>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
        <Container maxWidth="sm" sx={{ mt: 4, position: 'relative', flexGrow: 1, pb: 12 }}>
          <Stack spacing={4}>
            <Box sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              '&:hover .lang-switcher': {
                opacity: 1,
              }
            }}>
              <Header />
              <Box className="lang-switcher" sx={{ display: 'flex', gap: 1, opacity: 0, transition: 'opacity 0.3s ease-in-out' }}>
                <Button size="small" variant={i18n.language === 'uk' ? 'contained' : 'outlined'} onClick={() => i18n.changeLanguage('uk')}>
                  UK
                </Button>
                <Button size="small" variant={i18n.language === 'ru' ? 'contained' : 'outlined'} onClick={() => i18n.changeLanguage('ru')}>
                  RU
                </Button>
                <Button size="small" variant={i18n.language.startsWith('en') ? 'contained' : 'outlined'} onClick={() => i18n.changeLanguage('en')}>
                  EN
                </Button>
                <Button size="small" variant={i18n.language.startsWith('de') ? 'contained' : 'outlined'} onClick={() => i18n.changeLanguage('de')}>
                  DE
                </Button>
              </Box>
            </Box>
            <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
            <Filters currentFilter={filter} onFilterChange={setFilter} />
            <TodoList todos={filteredTodos} onToggle={toggleTodo} onTodoClick={handleOpenEditModal} />
          </Stack>
          <AddTodoButton onAddClick={handleOpenAddModal} />
        </Container>
        <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <Box sx={modalStyle}>
            <TodoForm
              onAdd={addTodo}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
              todoToEdit={editingTodo}
              handleClose={() => setIsModalOpen(false)}
            />
          </Box>
        </Modal>
      </Box>
    </ThemeProvider>
  )
}

export default App
