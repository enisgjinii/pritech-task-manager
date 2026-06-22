export interface TaskFormErrors {
  title?: string;
  description?: string;
}

export function validateTaskForm(
  title: string,
  description: string,
): TaskFormErrors {
  const errors: TaskFormErrors = {};
  const trimmedTitle = title.trim();
  const trimmedDescription = description.trim();

  if (!trimmedTitle) {
    errors.title = 'Title is required.';
  } else if (trimmedTitle.length < 3) {
    errors.title = 'Title must be at least 3 characters.';
  }

  if (!trimmedDescription) {
    errors.description = 'Description is required.';
  } else if (trimmedDescription.length < 5) {
    errors.description = 'Description must be at least 5 characters.';
  }

  return errors;
}
