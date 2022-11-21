import { defineEventHandler, setCookie } from 'h3';

const logout = defineEventHandler(
  async (event) => {
    setCookie(event, "token", null, { maxAge: 0 });
    return "logout";
  }
);

export { logout as default };
//# sourceMappingURL=logout.mjs.map
