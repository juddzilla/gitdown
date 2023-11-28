import { useState, useMemo } from 'react';

const prefix = '.tooltip-';
const containerClassName = `${prefix}container`;
const displayClassName = `${prefix}display`;
const infoClassName = `${prefix}info`;

export default ({ children, info }) => {
  const useHover = () => {
    const [hovered, setHovered] = useState(false);

    function tooltip(target, hovering) {
      if (!hovered) {
        const isInDisplayEl = target.closest(displayClassName);

        if (isInDisplayEl) {
          const container = target.closest(containerClassName);
          const info = container.querySelector(infoClassName);
          if (info) {
            const op = hovering ? 'add' : 'remove';
            info.classList[op]('opacity-100', 'pointer-events-auto');
          }
        }
      }
      setHovered(hovering);
    }

    return useMemo(() => ({
      onMouseOver({ target }) { tooltip(target, true); },
      onMouseOut({ target }) { tooltip(target, false); }
    }), []);
  }

  const eventHandlers = useHover();


  const classList = ['relative', 'flex', 'items-center', 'tooltip-container'];
  return (
      <div {...eventHandlers} className={ classList.join(' ') }>
        { children }
      </div>
  );
}