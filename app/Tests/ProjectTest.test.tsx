import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePage from '../Pages/HomePage';
import MarioKartPage from '../Pages/MarioKart'; 
import ScoreTrackerPage from '../Pages/ScoreTracker';
import AboutPage from '../Pages/AboutPage';
import NotFoundPage from '../Pages/404Page';
import ProjectPage from '../Pages/ProjectPage';
import { MemoryRouter, Routes, Route, Router } from 'react-router';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

// Test suite on the about page
describe('On the Project page', () => {
    // Render the page before each test
    beforeEach(async () => {
        render(
            <MemoryRouter initialEntries={['/Projects']}>
                <Routes>
                    <Route path="/Projects" element={<ProjectPage />} />
                </Routes>
            </MemoryRouter>
        );
    });

    test('clicking on the Personal Website project should show additional details', () => {
        // First, click on the Personal Website project
        fireEvent.click(screen.getByText(/personal website/i));

        // Assert the url of the page shows up after clicking
        expect(screen.getByText('https://www.github.com/BaoPun/BaoPun-Website')).toBeInTheDocument();
    });

    test('clicking on the Pokemon Simulator project twice should not show additional details', async () => {
        // First, click on the Pokemon Simulator project
        //fireEvent.click(screen.getByText(/pokemon simulator/i));
        await userEvent.click(screen.getByText(/pokemon simulator/i));

        // Assert the url of the project shows up after clicking
        expect(screen.getByText('https://www.github.com/BaoPun/PokemonSimulator')).toBeInTheDocument();

        // Click on the same project again
        await userEvent.click(screen.getByText(/pokemon simulator/i));

        // This time, the url of the project should not be visible
        expect(screen.queryByText('https://www.github.com/BaoPun/PokemonSimulator')).not.toBeInTheDocument();
    });

    test('clicking on the show filter button should show all of the filters', async () => {
        // Click on the show filter button 
        await userEvent.click(screen.getByText(/show filter/i));

        await waitFor(() => {
            expect(screen.getByText(/filter by languages/i)).toBeInTheDocument();
            expect(screen.getByText(/filter by frameworks/i)).toBeInTheDocument();
            expect(screen.getByText(/filter by tools/i)).toBeInTheDocument();
            expect(screen.getByText(/filter by databases/i)).toBeInTheDocument();
        });
    });

    test('entering \'pokemon sim\' in the filter should show the Pokemon Simulator project', async () => {
        // Click on the show filter button 
        await userEvent.click(screen.getByText(/show filter/i));

        // Enter in pokemon sim on the text box
        const filterInput = screen.getByRole('textbox', { name: /filter by name or description/i });
        await userEvent.type(filterInput, 'pokemon sim');

        await waitFor(() => {
            expect(screen.getByText(/pokemon simulator/i)).toBeInTheDocument();

        });
    });

    test('clicking twice on the filter button should not show the filters anymore', async () => {
        // Click twice
        await userEvent.click(screen.getByText(/show filter/i));
        await userEvent.click(screen.getByText(/hide filter/i));

        // The filters should no longer be there
        await waitFor(() => {
            expect(screen.queryByText(/filter by languages/i)).not.toBeInTheDocument();
            expect(screen.queryByText(/filter by frameworks/i)).not.toBeInTheDocument();
            expect(screen.queryByText(/filter by tools/i)).not.toBeInTheDocument();
            expect(screen.queryByText(/filter by databases/i)).not.toBeInTheDocument();
        });
    })

    // TODO: additional test cases to properly filter by project

    
});