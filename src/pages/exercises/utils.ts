import { Exercise } from '@prisma/client';

export interface FormData {
  name: string;
  sets: number;
  reps: number;
  rest: number;
  weight: number;
  description: string;
}

type FormDataKeys = keyof FormData;

export interface Action {
  type: string;
  payload?: string | Exercise;
}

export const formDataTemplate: FormData = {
  name: '',
  sets: 0,
  reps: 0,
  rest: 0,
  weight: 0,
  description: '',
};

export function reducer(state: FormData, action: Action) {
  const numberTypes = Object.values(formDataTemplate).filter((key) => {
    const value = formDataTemplate[key as FormDataKeys];

    return typeof value === 'number';
  });

  switch (action.type) {
    case 'clear':
      return formDataTemplate;
    case 'set':
      if (typeof action.payload === 'object') {
        return { ...action.payload } as FormData;
      }

      return state;
    default: {
      const value = numberTypes.includes(action.type)
        ? Number(action.payload)
        : action.payload;

      return { ...state, [action.type]: value };
    }
  }
}
