import { render, screen, fireEvent } from '@testing-library/react';
import { AvatarUpload } from '../AvatarUpload';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('AvatarUpload', () => {
  const mockOnAvatarChange = vi.fn();

  beforeEach(() => {
    mockOnAvatarChange.mockClear();
  });

  it('renders with default avatar fallback when no avatar provided', () => {
    render(<AvatarUpload onAvatarChange={mockOnAvatarChange} />);

    expect(screen.getByText(/Upload/i)).toBeInTheDocument();

    expect(screen.queryByText(/Remove/i)).not.toBeInTheDocument();
  });

  it('renders with avatar image when provided', () => {
    render(
      <AvatarUpload
        currentAvatar="https://example.com/avatar.jpg"
        onAvatarChange={mockOnAvatarChange}
        name="Test User"
      />
    );

    expect(screen.getByText(/Change/i)).toBeInTheDocument();

    expect(screen.getByText(/Remove/i)).toBeInTheDocument();
  });

  it('calls onAvatarChange when removing avatar', () => {
    render(
      <AvatarUpload
        currentAvatar="https://example.com/avatar.jpg"
        onAvatarChange={mockOnAvatarChange}
        name="Test User"
      />
    );

    fireEvent.click(screen.getByText(/Remove/i));

    expect(mockOnAvatarChange).toHaveBeenCalledWith(null);
  });
});
