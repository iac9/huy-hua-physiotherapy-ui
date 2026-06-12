import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Button } from './Button';

function renderWithRouter(ui: React.ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe('Button', () => {
  describe('as a <button>', () => {
    it('renders button text', () => {
      renderWithRouter(<Button>Click me</Button>);
      expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
    });

    it('fires onClick', async () => {
      const onClick = vi.fn();
      renderWithRouter(<Button onClick={onClick}>Press</Button>);
      await userEvent.click(screen.getByRole('button'));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('respects the disabled prop', async () => {
      const onClick = vi.fn();
      renderWithRouter(<Button disabled onClick={onClick}>Disabled</Button>);
      const btn = screen.getByRole('button');
      expect(btn).toBeDisabled();
      await userEvent.click(btn);
      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('as a <Link>', () => {
    it('renders an anchor when href is provided', () => {
      renderWithRouter(<Button href="/book">Book Now</Button>);
      expect(screen.getByRole('link', { name: 'Book Now' })).toBeInTheDocument();
    });

    it('links to the correct href', () => {
      renderWithRouter(<Button href="/book">Book Now</Button>);
      expect(screen.getByRole('link')).toHaveAttribute('href', '/book');
    });
  });

  describe('variants', () => {
    it('renders all four variants without throwing', () => {
      for (const variant of ['primary', 'outline', 'ghost', 'white'] as const) {
        expect(() =>
          renderWithRouter(<Button variant={variant}>Test</Button>)
        ).not.toThrow();
      }
    });
  });

  describe('sizes', () => {
    it('renders all three sizes without throwing', () => {
      for (const size of ['sm', 'md', 'lg'] as const) {
        expect(() =>
          renderWithRouter(<Button size={size}>Test</Button>)
        ).not.toThrow();
      }
    });
  });
});
