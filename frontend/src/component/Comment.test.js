import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommentForm from './Comment';

describe('CommentForm', () => {
  test('renders CommentForm component without crashing', () => {
    render(<CommentForm productId="testProductId" />);
  });

  test('updates state on user input', async () => {
    render(<CommentForm productId="testProductId" />);

    const textarea = screen.getByRole('textbox');
    await userEvent.type(textarea, 'Test comment');

    expect(textarea.value).toBe('Test comment');

    const rating = screen.getByTestId('rating');
    const thirdStar = rating.children[2]; 
    userEvent.click(thirdStar);

   
  });


});
