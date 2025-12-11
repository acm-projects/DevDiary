// Type tag component 
const TypeTag: React.FC<{ type: string }> = ({ type }) => {

    return (
        <span className={`px-3 py-1  text-xs font-medium rounded-full bg-orange-200/50 text-orange-300 border border-orange-400`}>
            {type}
        </span>
    );
};

export default TypeTag;