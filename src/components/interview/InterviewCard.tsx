import { InterviewType } from "./Interview";

type Props = {
  type: InterviewType;
  title: string;
  description: string;
};

const CLASS_COLOR: Record<InterviewType, {
  bg: string;
  border: string;
  button: string;
  shadow: string;
  hoverShadow: string;
}> = {
  'Basic': {
    bg: 'bg-green-600',
    border: 'border-green-200',
    button: 'bg-green-600 hover:bg-green-700',
    shadow: 'shadow-green-200/50',
    hoverShadow: 'hover:shadow-green-300/60'
  },
  'Behavioral': {
    bg: 'bg-yellow-400',
    border: 'border-yellow-200',
    button: 'bg-yellow-400 hover:bg-yellow-600',
    shadow: 'shadow-yellow-200/50',
    hoverShadow: 'hover:shadow-yellow-300/60'
  },
  'Expert': {
    bg: 'bg-red-400',
    border: 'border-red-200',
    button: 'bg-red-400 hover:bg-red-700',
    shadow: 'shadow-red-200/50',
    hoverShadow: 'hover:shadow-red-300/60'
  },
    'Custom': {
    bg: 'bg-gray-400',
    border: 'border-gray-200',
    button: 'bg-gray-400 hover:bg-gray-600',
    shadow: 'shadow-gray-200/50',
    hoverShadow: 'hover:shadow-gray-300/60'
  }
 }

export default function InterviewCard(props: Props) {
  const {  type, title, description } = props;
  const currentColors = CLASS_COLOR[type] ;

  return (
    <div className={`rounded-lg border-2 ${currentColors.border} bg-white p-6 shadow-lg ${currentColors.shadow} transition-shadow ${currentColors.hoverShadow} backdrop-blur-sm flex flex-col justify-between`}>


      <div className="mb-6 grid place-items-center">
        <div className={`flex h-32 w-32 items-center justify-center rounded-full ${currentColors.bg} text-white font-semibold text-lg`}>
          {type}
        </div>

        <h3 className="mb-3 text-center text-xl font-semibold text-gray-900">
        {title}
      </h3>


      <p className="mb-6 text-center text-sm text-gray-600 leading-relaxed">
        {description}
      </p>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">5 questions</span>
        <button
          className={`rounded px-4 py-2 text-sm font-medium text-white transition-colors ${currentColors.button}`}
          type="button"
        >
          Select
        </button>
      </div>
    </div>
  );
}
