import jwt from 'jsonwebtoken';
import { IUserData } from '../../insertFunctions/types';

function isWeekend(eventDate: Date): boolean {
  const currentDate = new Date();
  const daysUntilWeekend = 6 - currentDate.getDay();
  const nearestWeekendStartDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + daysUntilWeekend);
  const nearestWeekendEndDate = new Date(
    nearestWeekendStartDate.getFullYear(),
    nearestWeekendStartDate.getMonth(),
    nearestWeekendStartDate.getDate() + 1,
  );

  return eventDate >= nearestWeekendStartDate && eventDate < nearestWeekendEndDate;
}

function isSameMonth(eventDate: Date): boolean {
  const currentDate = new Date();
  const eventMonth = new Date(eventDate).getMonth();
  const currentMonth = currentDate.getMonth();
  return eventMonth === currentMonth;
}

function isSameWeek(eventDate: Date): boolean {
  const currentDate = new Date();
  const eventWeek = Math.floor((eventDate.getTime() - new Date(currentDate.getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000));
  const currentWeek = Math.floor((currentDate.getTime() - new Date(currentDate.getFullYear(), 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000));
  return eventWeek === currentWeek;
}

function createToken(user: IUserData) {
  if (!process.env.JWTTOKEN) {
    throw new Error('JWT secret is not defined in environment variables.');
  }

  return jwt.sign({ userId: user._id, username: user.email }, process.env.JWTTOKEN, { expiresIn: '10h' });
}

export { isWeekend, isSameMonth, isSameWeek, createToken };
