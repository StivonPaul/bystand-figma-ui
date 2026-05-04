import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface DateTimePickerProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  onClose: () => void;
  minDate?: string;
}

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export function LiquidDateTimePicker({ label, value, onChange, onClose, minDate }: DateTimePickerProps) {
  const now = new Date();
  const initial = value ? new Date(value) : now;

  const [year, setYear] = useState(initial.getFullYear());
  const [month, setMonth] = useState(initial.getMonth());
  const [day, setDay] = useState(initial.getDate());
  const [hour, setHour] = useState(initial.getHours());
  const [minute, setMinute] = useState(Math.floor(initial.getMinutes() / 15) * 15);

  const minD = minDate ? new Date(minDate) : null;

  const daysInMonth = getDaysInMonth(year, month);

  const isDisabledDay = (d: number) => {
    if (!minD) return false;
    const dt = new Date(year, month, d);
    const m = new Date(minD.getFullYear(), minD.getMonth(), minD.getDate());
    return dt < m;
  };

  const handleConfirm = () => {
    const iso = `${year}-${pad(month + 1)}-${pad(day)}T${pad(hour)}:${pad(minute)}`;
    onChange(iso);
    onClose();
  };

  // Day grid helpers
  const firstDow = new Date(year, month, 1).getDay();
  const totalCells = Math.ceil((firstDow + daysInMonth) / 7) * 7;

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1); }
    else setMonth(m => m - 1);
    setDay(1);
  };
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1); }
    else setMonth(m => m + 1);
    setDay(1);
  };

  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = [0, 15, 30, 45];

  const hourRef = useRef<HTMLDivElement>(null);
  const minRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (hourRef.current) {
      const el = hourRef.current.querySelector(`[data-h="${hour}"]`) as HTMLElement;
      el?.scrollIntoView({ block: "center", behavior: "smooth" });
    }
    if (minRef.current) {
      const el = minRef.current.querySelector(`[data-m="${minute}"]`) as HTMLElement;
      el?.scrollIntoView({ block: "center", behavior: "smooth" });
    }
  }, [hour, minute]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.97 }}
      transition={{ type: "spring", damping: 26, stiffness: 320 }}
      className="w-full rounded-3xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(32px) saturate(2)",
        WebkitBackdropFilter: "blur(32px) saturate(2)",
        border: "1px solid rgba(29,111,243,0.16)",
        boxShadow: "0 16px 48px rgba(29,111,243,0.14), 0 4px 16px rgba(0,0,0,0.06)",
      }}
    >
      {/* Header */}
      <div className="px-5 pt-5 pb-4" style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <p className="text-xs font-semibold text-[var(--color-primary)] uppercase tracking-widest mb-0.5">{label}</p>
        <p className="text-lg font-bold text-gray-900">
          {MONTHS[month]} {day}, {year} &nbsp;·&nbsp; {pad(hour)}:{pad(minute)}
        </p>
      </div>

      {/* Calendar */}
      <div className="px-4 pt-4">
        {/* Month nav */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={prevMonth}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/[0.05] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <span className="font-semibold text-sm text-gray-800">{MONTHS[month]} {year}</span>
          <button
            onClick={nextMonth}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/[0.05] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Day-of-week headers */}
        <div className="grid grid-cols-7 mb-1">
          {["Su","Mo","Tu","We","Th","Fr","Sa"].map(d => (
            <div key={d} className="h-7 flex items-center justify-center text-[10px] font-medium text-gray-400">{d}</div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-y-0.5 mb-2">
          {Array.from({ length: totalCells }).map((_, i) => {
            const cellDay = i - firstDow + 1;
            const valid = cellDay >= 1 && cellDay <= daysInMonth;
            const disabled = valid && isDisabledDay(cellDay);
            const selected = valid && cellDay === day;
            return (
              <button
                key={i}
                disabled={!valid || disabled}
                onClick={() => valid && !disabled && setDay(cellDay)}
                className={`h-8 w-full rounded-full text-xs font-medium transition-all ${
                  !valid ? "opacity-0 pointer-events-none" :
                  disabled ? "text-gray-300 cursor-not-allowed" :
                  selected
                    ? "bg-[var(--color-primary)] text-white shadow-sm"
                    : "text-gray-700 hover:bg-[var(--color-primary-highlight)]"
                }`}
              >
                {valid ? cellDay : ""}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time selector */}
      <div className="px-4 pb-4">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Time</p>
        <div className="flex gap-2">
          {/* Hours */}
          <div
            ref={hourRef}
            className="flex-1 h-28 overflow-y-auto rounded-2xl"
            style={{ background: "rgba(0,0,0,0.03)", scrollbarWidth: "none" }}
          >
            {hours.map(h => (
              <button
                key={h}
                data-h={h}
                onClick={() => setHour(h)}
                className={`w-full py-2 text-sm font-medium text-center transition-all ${
                  h === hour
                    ? "text-[var(--color-primary)] font-bold"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {pad(h)}
              </button>
            ))}
          </div>

          <div className="flex items-center text-gray-300 font-thin text-xl self-stretch pb-1">:</div>

          {/* Minutes */}
          <div
            ref={minRef}
            className="flex-1 h-28 overflow-y-auto rounded-2xl"
            style={{ background: "rgba(0,0,0,0.03)", scrollbarWidth: "none" }}
          >
            {minutes.map(m => (
              <button
                key={m}
                data-m={m}
                onClick={() => setMinute(m)}
                className={`w-full py-2 text-sm font-medium text-center transition-all ${
                  m === minute
                    ? "text-[var(--color-primary)] font-bold"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {pad(m)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 pb-5 flex gap-2">
        <button
          onClick={onClose}
          className="flex-1 py-3 rounded-2xl text-sm font-semibold text-gray-600 transition-colors hover:bg-black/[0.04]"
          style={{ border: "1px solid rgba(0,0,0,0.08)" }}
        >
          Cancel
        </button>
        <button
          onClick={handleConfirm}
          className="flex-1 py-3 rounded-2xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]"
          style={{ background: "var(--color-primary)", boxShadow: "0 4px 16px rgba(29,111,243,0.28)" }}
        >
          Confirm
        </button>
      </div>
    </motion.div>
  );
}
