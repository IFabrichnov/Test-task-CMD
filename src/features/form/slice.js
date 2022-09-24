import { createSlice } from '@reduxjs/toolkit'

const form = createSlice({
  name: 'form',
  initialState: {
    fio: '',
    how_old: '',
    mail: '',
    date: '',
    address: ''
  },
  reducers: {
    updateVal(state, { payload: { key, val } }) {
      state[key] = val
    },
  },
})

export const { updateVal } = form.actions

export default form.reducer
