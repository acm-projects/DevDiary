// Status tag component with different colors based on status
const StatusTag: React.FC<{ status: string }> = ({ status }) => {
    const statusStyles: { [key: string]: string } = {
        'In Progress': 'bg-amber-200/20 text-yellow-300 border border-amber-300',
        'Completed': 'bg-green-500/20 text-green-300 border border-green-400',
        'On Hold': 'bg-gray-500/20 text-gray-300 border border-gray-400',
    };
    const style = statusStyles[status] || statusStyles['On Hold'];
    return <span className={`px-3 py-1 text-xs font-medium rounded-full ${style}`}>{status}</span>;
};
export default StatusTag;