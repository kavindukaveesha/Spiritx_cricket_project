// Common Input Component
const AuthInput = ({ icon: Icon, type, placeholder, ...props }: { icon: React.ElementType, type: string, placeholder: string, [key: string]: any }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Icon className="text-neutral-400 dark:text-neutral-500" size={20} />
      </div>
      <input
        type={type}
        placeholder={placeholder}
        className="form-input pl-12 w-full border-neutral-200 dark:border-neutral-700 
          focus:ring-2 focus:ring-brand-primary/50 dark:focus:ring-brand-secondary/50 
          rounded-lg transition-all duration-300"
        {...props}
      />
    </div>
  );
};

export default AuthInput;