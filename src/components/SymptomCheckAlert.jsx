
export default function SymptomCheckAlert({ isOpen, onClose, onTextSelect, onImageSelect }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 sm:p-6">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-sm sm:max-w-md p-4 sm:p-6 overflow-y-auto max-h-[90vh]">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">Check Symptoms</h2>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">How would you like to check your symptoms?</p>
                
                <div className="space-y-3 mb-4 sm:mb-6">
                    <button
                        onClick={onTextSelect}
                        className="w-full flex items-center justify-between p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors text-sm sm:text-base"
                    >
                        <div className="flex items-center">
                            <span className="text-xl sm:text-2xl mr-2 sm:mr-3">💬</span>
                            <span>Text Description</span>
                        </div>
                        <span className="text-lg sm:text-xl">→</span>
                    </button>
                    
                    <button
                        onClick={onImageSelect}
                        className="w-full flex items-center justify-between p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-200 transition-colors text-sm sm:text-base"
                    >
                        <div className="flex items-center">
                            <span className="text-xl sm:text-2xl mr-2 sm:mr-3">📷</span>
                            <span>Image Analysis</span>
                        </div>
                        <span className="text-lg sm:text-xl">→</span>
                    </button>
                </div>
                
                <button
                    onClick={onClose}
                    className="w-full py-2 sm:py-2.5 text-sm sm:text-base text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
