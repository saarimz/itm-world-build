'use client';

interface LocalDateProps {
  date: string;
  timezone?: string;
}

export function LocalDate({ date, timezone }: LocalDateProps) {
  const formatDate = (date: string) => {
    try {
      return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        timeZone: timezone
      });
    } catch (e) {
      return date;
    }
  };

  return <>{formatDate(date)}</>;
} 