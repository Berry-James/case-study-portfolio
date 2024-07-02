import React, { AnchorHTMLAttributes, ReactNode } from 'react';
import { FaGithub, FaPhone } from 'react-icons/fa';
import { GrDocumentPdf } from 'react-icons/gr';
import { IoLogoLinkedin } from 'react-icons/io5';
import { MdAlternateEmail } from 'react-icons/md';

export const Contact = () => {

    return (
        <div className='flex flex-col gap-2 items-center'>
            <span>Contact</span>
            <hr className='w-24'/>
            <div className='flex items-center justify-evenly gap-8'>
                <ContactItem 
                    href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
                    icon={<MdAlternateEmail />}
                />
                <ContactItem 
                    href={process.env.NEXT_PUBLIC_LINKEDIN_URL}
                    icon={<IoLogoLinkedin />}
                />
                <ContactItem 
                    href={process.env.NEXT_PUBLIC_GITHUB_URL}
                    icon={<FaGithub />}
                />
                <ContactItem 
                    href={'/assets/documents/James_Berry_Resume.pdf'}
                    download={'James_Berry_Resume.pdf'}
                    icon={<GrDocumentPdf />}
                />
            </div>
        </div>
    )

}

const ContactItem = (props: AnchorHTMLAttributes<HTMLAnchorElement> & { icon: ReactNode }) => (
    <a 
        href={props.href} 
        className='cursor-pointer'
        target='_blank'
        rel='noreferrer'
    >
        {props.icon}
    </a>
)
