import React, { ReactNode } from 'react';
import { IoLogoLinkedin } from 'react-icons/io5';
import { MdAlternateEmail } from 'react-icons/md';

export const Contact = () => {

    return (
        <div className='flex flex-col gap-2 items-center'>
            <span>Contact</span>
            <hr className='w-24'/>
            <div className='flex items-center justify-evenly gap-8'>
                <ContactItem 
                    text={process.env.EMAIL}
                    href={`mailto:${process.env.EMAIL}`}
                    icon={<MdAlternateEmail />}
                />
                <ContactItem 
                    href={process.env.LINKEDIN_URL}
                    icon={<IoLogoLinkedin />}
                />
            </div>
           
        </div>
    )

}

const ContactItem = ({ text, icon, href }: { text?: string, icon: ReactNode, href: string | undefined; }) => (
    <a href={href}>
        <div className='flex items-center gap-2'>
            {icon}
        </div>
    </a>
    
)