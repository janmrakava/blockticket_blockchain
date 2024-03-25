import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  eventId: string;
  ticketType: string;
  quantity: number;
  imageSrc: string;
  city: string;
  name: {
    cs: string;
    en: string;
  };
  nameOfPlace: string;
  date: string;
  prices: {
    USD: number;
    EUR: number;
    CZK: number;
  };
  ticketName: {
    cs: string;
    en: string;
  };
}

const initialState: CartItem[] = [];

export const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const {
        eventId,
        ticketType,
        quantity,
        imageSrc,
        name,
        nameOfPlace,
        city,
        date,
        prices,
        ticketName
      } = action.payload;
      const existingItemIndex = state.findIndex(
        (item: CartItem) => item.eventId === eventId && item.ticketType === ticketType
      );

      if (existingItemIndex !== -1) {
        state[existingItemIndex].quantity += quantity;
      } else {
        state.push({
          eventId,
          ticketType,
          quantity,
          imageSrc,
          name,
          city,
          nameOfPlace,
          date,
          prices,
          ticketName
        });
      }
    },
    removeFromCart: (state, action: PayloadAction<{ eventId: string; ticketType: string }>) => {
      const { eventId, ticketType } = action.payload;
      const itemIndex = state.findIndex(
        (item: CartItem) => item.eventId === eventId && item.ticketType === ticketType
      );

      if (itemIndex !== -1) {
        state.splice(itemIndex, 1);
      }
    },
    clearCart: (state) => {
      state.splice(0, state.length);
    }
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
