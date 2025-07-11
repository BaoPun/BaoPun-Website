import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MarioKartPage from '../Pages/MarioKart'; 
import AboutPage from '../Pages/AboutPage';
import { MemoryRouter, Routes, Route, Router } from 'react-router';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

// Test suite on the about page
describe('On the About page', () => {
    // Clicking on the 'Mario Kart' area of the navigation bar will navigate to the Mario Kart page
    test('navigates to the Mario Kart upon clicking on it', () => {
        render(
            <MemoryRouter initialEntries={['/About']}>
                <Routes>
                    <Route path="/About" element={<AboutPage />} />
                    <Route path="/MarioKart" element={<MarioKartPage />} />
                </Routes>
            </MemoryRouter>
        );

        // Click the Mario Kart area, looking for a style of 18px
        //fireEvent.click(screen.getAllByText('Mario Kart').);
        for(let i = 0; i < screen.getAllByText('Mario Kart').length; i++){
            if(screen.getAllByText('Mario Kart')[i].style.fontSize === '18px'){
                fireEvent.click(screen.getAllByText('Mario Kart')[i]);
                break;
            }
        }

        // Assert that 'mario kart' is rendered on the new page
        //await expect(document.title).toEqual('Mario Kart');
        expect(screen.getAllByText(/competitive mario kart/i).length > 0).toBe(true);
    });
});