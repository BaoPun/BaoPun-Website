import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePage from '../Pages/HomePage';
import MarioKartPage from '../Pages/MarioKart'; 
import ScoreTrackerPage from '../Pages/ScoreTracker';
import NotFoundPage from '../Pages/404Page';
import { MemoryRouter, Routes, Route, Router } from 'react-router';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';