interface ToolbarButtonProps {
  onClick: () => void;
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  title: string;
}

export const ToolbarButton = ({ onClick, isActive, disabled, children, title }: ToolbarButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`p-2 rounded-md transition-colors duration-200 ${
      isActive
        ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800 border border-transparent'
    } ${
      disabled 
        ? 'opacity-50 cursor-not-allowed' 
        : 'cursor-pointer'
    }`}
  >
    {children}
  </button>
);

export const ToolbarSeparator = () => (
  <div className="w-px h-6 bg-slate-300 mx-1" />
);