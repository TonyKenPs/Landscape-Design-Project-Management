const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const HASH_PATTERN = /^\$2[aby]\$\d{2}\$/;
const SALT_ROUNDS = 12;

function isPasswordHash(value) {
  return typeof value === "string" && HASH_PATTERN.test(value);
}

function legacyPasswordMatches(storedPassword, password) {
  const stored = Buffer.from(String(storedPassword));
  const candidate = Buffer.from(String(password));
  return stored.length === candidate.length && crypto.timingSafeEqual(stored, candidate);
}

async function verifyPassword(storedPassword, password) {
  if (isPasswordHash(storedPassword)) return bcrypt.compare(password, storedPassword);
  return legacyPasswordMatches(storedPassword, password);
}

function hashPassword(password) {
  return bcrypt.hash(password, SALT_ROUNDS);
}

module.exports = { hashPassword, isPasswordHash, verifyPassword };
