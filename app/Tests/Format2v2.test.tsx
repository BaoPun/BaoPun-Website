import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePage from '../Pages/HomePage';
import MarioKartPage from '../Pages/MarioKart'; 
import ScoreTrackerPage from '../Pages/ScoreTracker';
import { MemoryRouter, Routes, Route, Router } from 'react-router';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

// Test suite on the home Mario Kart page.
describe('On the MarioKart page', () => {
    // Clicks on the 2v2 button to go to the 2v2 Score Tracker Page.
    test('navigates to ScoreTrackerPage with format 2 after clicking the 2v2 button.', () => {
        render(
            <MemoryRouter initialEntries={['/MarioKart']}>
                <Routes>
                    <Route path="/MarioKart" element={<MarioKartPage />} />
                    <Route path="/ScoreTracker" element={<ScoreTrackerPage />} />
                </Routes>
            </MemoryRouter>
        );

        // Click the 2v2 button
        fireEvent.click(screen.getByText('2v2'));

        // Assert that '2v2 Score Tracker' is rendered on the new page
        expect(screen.getByText(/2v2 Score Tracker/i)).toBeInTheDocument();
    });

    // Clicks on the 'Click Here' button to go back to the Home page
    test('returns to the home page after clicking on the \'Click Here\' button on the top of the page.', () => {
        render(
            <MemoryRouter initialEntries={['/MarioKart']}>
                <Routes>
                    <Route path="/MarioKart" element={<MarioKartPage />} />
                    <Route path="/" element={<HomePage />} />
                </Routes>
            </MemoryRouter>
        );

        // Click on the 'Click Here' button
        fireEvent.click(screen.getByText(/Click Here/i));

        // Assert that we are on the home page via the title
        expect(screen.getByText('Information about Bao Phung')).toBeInTheDocument();
    });
});

// Test suite on the 2v2 Format Page
describe('On the 2v2 Format Page', () => {
    // Before each test, open the Mario Kart page.  Then, open the ScoreTracker.
    beforeEach(async () => {
        render(
            <MemoryRouter initialEntries={['/MarioKart']}>
                <Routes>
                    <Route path="/MarioKart" element={<MarioKartPage />} />
                    <Route path="/ScoreTracker" element={<ScoreTrackerPage />} />
                </Routes>
            </MemoryRouter>
        );

        // Click the 2v2 button
        const format2v2Button = screen.getByRole('button', { name: /2v2/i });
        await userEvent.click(format2v2Button);
    });

    // Add a team Q
    test('Add a new team', async () => {
        // Locate the input box
        const input = screen.getByRole('textbox', { name: /enter team name/i });
        expect(input).toBeInTheDocument();

        // And then add a team called 'Q' and then press ENTER
        await userEvent.type(input, 'Q');
        await userEvent.keyboard('{Enter}');

        // After submitting team Q, input should be cleared
        expect(input).toHaveValue('');

        // Team Q should then be rendered
        await waitFor(() => {
            expect(screen.getByText(/Q\s*\(0\)/)).toBeInTheDocument();
        });
    })

    // Try to add a second team Q (should fail)
    test('Adding a team with the same starting tag will fail.', async () => {
        // Mock window.alert and simulate user closing the alert
        const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

        // Locate the input box
        const input = screen.getByRole('textbox', { name: /enter team name/i });
        expect(input).toBeInTheDocument();

        // And then add a team called 'Q' and then press ENTER
        await userEvent.type(input, 'Q');
        await userEvent.keyboard('{Enter}');

        // After submitting team Q, input should be cleared
        expect(input).toHaveValue('');

        // Team Q should then be rendered
        await waitFor(() => {
            expect(screen.getByText(/Q\s*\(0\)/)).toBeInTheDocument();
        });

        // Try to add a second team with 'quartz'
        await userEvent.type(input, 'quartz');
        await userEvent.keyboard('{Enter}');

        // We should still see the input field cleared
        expect(input).toHaveValue('');

        // Assert alert was called
        await waitFor(() => {
            expect(alertMock).toHaveBeenCalledWith(expect.stringMatching(/already exists/i));
        });

        // Finally, ensure that there is only 1 team added
        const teams = screen.getAllByText(/Q\s*\(0\)/i);
        expect(teams).toHaveLength(1);

        // Clear the alert box
        alertMock.mockRestore();
    })

    // Add two unique teams (Q and W)
    test('successfully adds teams Q and R and ensures there are exactly 2 teams', async () => {
        // Locate the input box
        const input = screen.getByRole('textbox', { name: /enter team name/i });
        expect(input).toBeInTheDocument();

        // Add team 'Q'
        await userEvent.type(input, 'Q');
        await userEvent.keyboard('{Enter}');

        // Add team 'R'
        await userEvent.type(input, 'R');
        await userEvent.keyboard('{Enter}');

        // Wait for both teams to appear and ensure there are exactly 2 teams
        await waitFor(() => {
            const teams = screen.getAllByText(/\([0-9]+\)/); // matches "Q (0)" and "R (0)"
            expect(teams).toHaveLength(2);
            expect(screen.getByText(/Q\s*\(0\)/)).toBeInTheDocument();
            expect(screen.getByText(/R\s*\(0\)/)).toBeInTheDocument();
        });
    });

    // Add 6 unique teams (Q, W, E, R, T, Y)
    test('successfully adds 6 different teams, disables the addTeam form, and enables the addScore form', async () => {
        // Mock window.alert and simulate user closing the alert
        const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

        // Locate the input box
        const teamInput = screen.getByRole('textbox', { name: /enter team name/i });
        expect(teamInput).toBeInTheDocument();

        // Add team 'Q'
        await userEvent.type(teamInput, 'Q');
        await userEvent.keyboard('{Enter}');

        // Add team 'W'
        await userEvent.type(teamInput, 'W');
        await userEvent.keyboard('{Enter}');

        // Add team 'E'
        await userEvent.type(teamInput, 'E');
        await userEvent.keyboard('{Enter}');

        // Add team 'R'
        await userEvent.type(teamInput, 'R');
        await userEvent.keyboard('{Enter}');

        // Add team 'T'
        await userEvent.type(teamInput, 'T');
        await userEvent.keyboard('{Enter}');

        // Add team 'Y'
        await userEvent.type(teamInput, 'Y');
        await userEvent.keyboard('{Enter}');

        // Wait for both teams to appear and ensure there are exactly 2 teams
        // \s = whitepace
        await waitFor(() => {
            expect(screen.getByText(/Q\s\(0\)/)).toBeInTheDocument();
            expect(screen.getByText(/W\s\(0\)/)).toBeInTheDocument();
            expect(screen.getByText(/E\s\(0\)/)).toBeInTheDocument();
            expect(screen.getByText(/R\s\(0\)/)).toBeInTheDocument();
            expect(screen.getByText(/T\s\(0\)/)).toBeInTheDocument();
            expect(screen.getByText(/Y\s\(0\)/)).toBeInTheDocument();

            // Team input form should no longer be in the document
            expect(teamInput).not.toBeInTheDocument();

            // Team score form should now be in the document
            expect(screen.getByRole('textbox', { name: /enter team for/i })).toBeInTheDocument();
        });

        // Clear the alert box
        alertMock.mockRestore();
    });
});

// Test suite on team submission for placements
describe('After submitting Q,W,E,R,T,Y for 2v2 teams on the 2v2 Format Page', () => {
    // Before each test, open the ScoreTracker page.  Then, submit teams Q, W, E, R, T, Y
    beforeEach(async () => {
        render(
            <MemoryRouter initialEntries={[{ pathname: '/ScoreTracker', state: { format: '2' } }]}>
                <Routes>
                    <Route path="/ScoreTracker" element={<ScoreTrackerPage />} />
                </Routes>
            </MemoryRouter>
        );

        // Mock window.alert and simulate user closing the alert
        const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

        // Locate the input box
        const teamInput = screen.getByRole('textbox', { name: /enter team name/i });

        // Add team 'Q'
        await userEvent.type(teamInput, 'Q');
        await userEvent.keyboard('{Enter}');

        // Add team 'W'
        await userEvent.type(teamInput, 'W');
        await userEvent.keyboard('{Enter}');

        // Add team 'E'
        await userEvent.type(teamInput, 'E');
        await userEvent.keyboard('{Enter}');

        // Add team 'R'
        await userEvent.type(teamInput, 'R');
        await userEvent.keyboard('{Enter}');

        // Add team 'T'
        await userEvent.type(teamInput, 'T');
        await userEvent.keyboard('{Enter}');

        // Add team 'Y'
        await userEvent.type(teamInput, 'Y');
        await userEvent.keyboard('{Enter}');

        // Clear the alert box
        alertMock.mockRestore();
    });

    test('Submitting placements for an invalid team should reject the input and inform the user.', async () => {
        // Mock window.alert and simulate user closing the alert
        const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

        // Get the textbox for the score input
        const scoreInput = screen.getByRole('textbox', { name: /enter team for/i });
        expect(scoreInput).toBeInTheDocument();

        // Attempt to submit team 'xdd'
        await userEvent.type(scoreInput, 'xdd');
        await userEvent.keyboard('{Enter}');

        // There should be an error
        await waitFor(() => {
            expect(alertMock).toHaveBeenCalledWith(expect.stringMatching(/not found/i));
        });

        // Clear the alert box
        alertMock.mockRestore();
    })

    test('Submitting placements for a valid team that has no more entries should reject the input and inform the user', async () => {
        // Mock window.alert and simulate user closing the alert
        const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

        // Get the textbox for the score input
        const scoreInput = screen.getByRole('textbox', { name: /enter team for/i });
        expect(scoreInput).toBeInTheDocument();

        // Attempt to submit team 'Q' over 3 times
        for(let i = 0; i < 3; i++){
            await userEvent.type(scoreInput, 'Q');
            await userEvent.keyboard('{Enter}');
        }

        // There should be an error.  Also validate team Q's score post error.
        await waitFor(() => {
            expect(alertMock).toHaveBeenCalledWith(expect.stringMatching(/no more entries/i));

            // Team Q should have 27 points
            expect(screen.getByText(/Q\s\(27\)/)).toBeInTheDocument();

            // Team Q should have 0 entries
            expect(screen.getByText(/Q\s\(0\)/)).toBeInTheDocument();
        });

        // Clear the alert box
        alertMock.mockRestore();
    });

    test('Submitting scores for all teams for all 12 races should give correct results', async () => {
        // Mock window.alert and simulate user closing the alert
        const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

        // Get the textbox for the score input
        const scoreInput = screen.getByRole('textbox', { name: /enter team for/i });
        expect(scoreInput).toBeInTheDocument();

        // For all 12 races: Q gets 1-2, W gets 3-4, E gets 5-6, R gets 7-8, T gets 9-10, Y gets 11-12.
        // Q: 27, W: 19, E: 15, R: 11, T: 7, Y: 3
        // above * 12 for all
        for(let i = 0; i < 12; i++){
            for(let j = 0; j < 2; j++){
                await userEvent.type(scoreInput, 'Q');
                await userEvent.keyboard('{Enter}');
            }

            for(let j = 0; j < 2; j++){
                await userEvent.type(scoreInput, 'W');
                await userEvent.keyboard('{Enter}');
            }

            for(let j = 0; j < 2; j++){
                await userEvent.type(scoreInput, 'E');
                await userEvent.keyboard('{Enter}');
            }

            for(let j = 0; j < 2; j++){
                await userEvent.type(scoreInput, 'R');
                await userEvent.keyboard('{Enter}');
            }

            for(let j = 0; j < 2; j++){
                await userEvent.type(scoreInput, 'T');
                await userEvent.keyboard('{Enter}');
            }

            for(let j = 0; j < 2; j++){
                await userEvent.type(scoreInput, 'Y');
                await userEvent.keyboard('{Enter}');
            }
        }

        // Double check scores and ensure that the mogi is over
        await waitFor(() => {
            expect(alertMock).toHaveBeenCalledWith(expect.stringMatching(/mogi is over/i));

            // Team Q should have 27*12 points
            expect(screen.getByText(/Q\s\(324\)/)).toBeInTheDocument();

            // Team W should have 19*12 points
            expect(screen.getByText(/W\s\(228\)/)).toBeInTheDocument();

            // Team E should have 15*12 points
            expect(screen.getByText(/E\s\(180\)/)).toBeInTheDocument();

            // Team R should have 11*12 points
            expect(screen.getByText(/R\s\(132\)/)).toBeInTheDocument();

            // Team T should have 7*12 points
            expect(screen.getByText(/T\s\(84\)/)).toBeInTheDocument();

            // Team Y should have 3*12 points
            expect(screen.getByText(/Y\s\(36\)/)).toBeInTheDocument();

            // In addition, the textbox should now be in read only.  Have a nested waitFor to wait for textbox to be readonly
            waitFor(() => {
                expect(scoreInput).toHaveAttribute('readOnly');
            });
        });

        // Close all alerts
        alertMock.mockRestore();
    }, 1000*30);    // have this test run for up to 30 seconds
});