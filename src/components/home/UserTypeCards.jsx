import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserTypeCard = ({ type, title, buttonText, imageSrc }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        if (type === 'instructor') {
            navigate('/apply-instructor');
        } else {
            navigate('/subscribe');
        }
    };

    return (
        <div className="rounded-lg overflow-hidden shadow-md bg-white relative h-64">
            {/* Background image with overlay */}
            <div className="relative h-full">
                <img 
                    src={imageSrc} 
                    alt={`${title} background`} 
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0  bg-opacity-30 flex flex-col justify-center items-center p-6 text-white">
                    <h3 className="text-2xl font-bold mb-6">{title}</h3>
                    <button 
                        onClick={handleClick}
                        className={`px-6 py-3 rounded-full ${
                            type === 'instructor' 
                                ? 'bg-white text-gray-800 hover:bg-gray-100' 
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                        } font-medium hover:shadow-lg transition duration-300 transform hover:scale-105`}
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

const UserTypeCards = () => {
    const userTypes = [
        {
            type: 'instructor',
            title: 'FOR INSTRUCTORS',
            buttonText: 'Start a class today',
            imageSrc: '/images/Instructor.png'
        },
        {
            type: 'student',
            title: 'FOR STUDENTS',
            buttonText: 'Start Now',
            imageSrc: '/images/Students.png'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userTypes.map((userType) => (
                <UserTypeCard 
                    key={userType.type}
                    type={userType.type}
                    title={userType.title}
                    buttonText={userType.buttonText}
                    imageSrc={userType.imageSrc}
                />
            ))}
        </div>
    );
};

export default UserTypeCards;