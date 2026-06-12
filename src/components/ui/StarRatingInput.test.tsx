import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StarRatingInput } from './StarRatingInput';

describe('StarRatingInput', () => {
  it('renders 5 star buttons', () => {
    render(<StarRatingInput value={0} onChange={() => {}} />);
    expect(screen.getAllByRole('button')).toHaveLength(5);
  });

  it('does not show a label when value is 0', () => {
    render(<StarRatingInput value={0} onChange={() => {}} />);
    for (const label of ['Poor', 'Fair', 'Good', 'Very good', 'Excellent']) {
      expect(screen.queryByText(label)).not.toBeInTheDocument();
    }
  });

  it('shows the correct label for each rating value', () => {
    const labels = ['Poor', 'Fair', 'Good', 'Very good', 'Excellent'];
    labels.forEach((label, i) => {
      const { unmount } = render(<StarRatingInput value={i + 1} onChange={() => {}} />);
      expect(screen.getByText(label)).toBeInTheDocument();
      unmount();
    });
  });

  it('calls onChange with the star number when clicked', async () => {
    const onChange = vi.fn();
    render(<StarRatingInput value={0} onChange={onChange} />);
    await userEvent.click(screen.getByLabelText('Rate 3 stars'));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('calls onChange with 1 when the first star is clicked', async () => {
    const onChange = vi.fn();
    render(<StarRatingInput value={0} onChange={onChange} />);
    await userEvent.click(screen.getByLabelText('Rate 1 star'));
    expect(onChange).toHaveBeenCalledWith(1);
  });
});
