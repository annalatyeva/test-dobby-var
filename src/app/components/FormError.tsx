interface FormErrorProps {
  message: string;
}

export default function FormError({ message }: FormErrorProps) {
  if (!message) return null;

  return (
    <div className="max-w-md w-full mt-4 lg:mt-6 mb-4 p-3 bg-red-50 border border-red-200 rounded-lg animate-fadeIn">
      <div className="text-red-700 text-sm font-medium flex items-center gap-2">
        <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
        {message}
      </div>
    </div>
  );
}
