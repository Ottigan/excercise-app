import { Workout } from '@prisma/client';

export interface FormData {
  name: string;
}

type FormDataKeys = keyof FormData;

export interface Action {
  type: string;
  payload?: string | Workout;
}

export const formDataTemplate: FormData = {
  name: '',
};

export function reducer(state: FormData, action: Action) {
  const numberTypes = Object.keys(formDataTemplate).filter((key) => {
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
