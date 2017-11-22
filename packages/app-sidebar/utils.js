import { serviceUrl } from '@bufferapp/session-manager';

export const currentUrl = () => window.location.href;

export const logoutUrl = ({ production }) =>
  `${serviceUrl({ production })}/logout/?redirect=${currentUrl()}`;
