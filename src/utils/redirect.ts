import { EventT } from '../core/block.ts';

export const redirect: EventT = (event) => {
  event.preventDefault();
  event.stopPropagation();

  const target = event.target as HTMLLinkElement;

  document.location.href = target.href;
};
