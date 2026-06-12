import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AccordionItem } from './AccordionItem';

const Q = 'Do I need a referral?';
const A = 'No referral is needed to see a physiotherapist.';

describe('AccordionItem', () => {
  it('renders the question', () => {
    render(<AccordionItem question={Q} answer={A} />);
    expect(screen.getByText(Q)).toBeInTheDocument();
  });

  it('renders the answer in the DOM (hidden via CSS, not removed)', () => {
    render(<AccordionItem question={Q} answer={A} />);
    expect(screen.getByText(A)).toBeInTheDocument();
  });

  it('starts with aria-expanded false', () => {
    render(<AccordionItem question={Q} answer={A} />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
  });

  it('sets aria-expanded to true after click', async () => {
    render(<AccordionItem question={Q} answer={A} />);
    await userEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'true');
  });

  it('toggles closed on second click', async () => {
    render(<AccordionItem question={Q} answer={A} />);
    const btn = screen.getByRole('button');
    await userEvent.click(btn);
    await userEvent.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'false');
  });
});
