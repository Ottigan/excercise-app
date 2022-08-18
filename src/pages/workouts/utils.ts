export interface FormData {
  name: string;
  description: string;
}

export interface Action {
  type: string;
  payload?: string;
}

export const formDataTemplate: FormData = {
  name: '',
  description: '',
};

export function reducer(state: FormData, action: Action) {
  switch (action.type) {
  case 'clear':
    return formDataTemplate;
  default: {
    return { ...state, [action.type]: action.payload };
  }
  }
}
