import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loan: 0,
  balance: 0,
  loanPurpose: "",
  isLoading: false,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    deposit(state, action) {
      state.balance = state.balance + action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance = state.balance - action.payload;
    },
    loan: {
      prepare(amount, loanPurpose) {
        return { payload: { amount, loanPurpose } };
      },
      reducer(state, action) {
        state.loan = state.loan + action.payload.amount;
        state.loanPurpose = state.loanPurpose + action.payload.loanPurpose;
        state.balance = state.balance + action.payload.amount;
      },
    },
    payloan(state) {
      state.balance = state.balance - state.loan;
      state.loanPurpose = "";
      state.loan = 0;
    },
    converting(state) {
      state.isLoading = true;
    },
  },
});
console.log(accountSlice);

export const { withdraw, loan, payloan, converting } = accountSlice.actions;

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async function (dispatch, getState) {
    dispatch({ type: "account/converting" });
    const res = await fetch(
      `https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${currency}&to=USD`
    );
    console.log(getState());
    const data = await res.json();
    const converted = data.rates.USD;
    dispatch({ type: "account/deposit", payload: converted });
  };
}

console.log(loan(1000, "buy a car"));

export default accountSlice.reducer;

/*
export default function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
        isLoading: false,
      };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/loan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.loanPurpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payloan":
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    case "account/converting":
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}

export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };

  return async function (dispatch, getState) {
    dispatch({ type: "account/converting" });
    const res = await fetch(
      `https://api.frankfurter.dev/v1/latest?amount=${amount}&from=${currency}&to=USD`
    );
    console.log(getState());
    const data = await res.json();
    const converted = data.rates.USD;
    dispatch({ type: "account/deposit", payload: converted });
  };
}

export function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

export function loan(loan) {
  return {
    type: "account/loan",
    payload: { amount: loan, loanPurpose: "buy a car " },
  };
}

export function payloan() {

  return { type: "account/payloan" };
}
*/
