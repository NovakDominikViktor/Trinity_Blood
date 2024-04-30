import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommentForm from './Comment';

describe('CommentForm', () => {
  test('renders CommentForm component without crashing', () => {
    render(<CommentForm productId="testProductId" />);
  });

  test('updates state on user input', async () => {
    render(<CommentForm productId="testProductId" />);

    // Simulate user typing in the textarea
    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, 'Test comment');

    // Check if the textarea value has been updated
    expect(textarea.value).toBe('Test comment');

    // Simulate user clicking on the rating stars
    const rating = screen.getByTestId('rating');
    const thirdStar = rating.children[2]; // Select the 3rd star
    userEvent.click(thirdStar); // Click on the 3rd star

    // Check if the rating value has been updated
    // Note: You'll need to expose the rating value for this test to work
    // expect(screen.getByTestId('rating-value').textContent).toBe('3');
  });

  // Add more tests as needed
});
