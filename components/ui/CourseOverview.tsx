import React, { ReactNode } from 'react';
import Image from 'next/image';
import { Button } from './button';
import CourseCover from './CourseCover';
import Link from 'next/link';

const BookOverview = ({
    title, 
    author, 
    genre, 
    rating, 
    description, 
    totalCopies,
    coverUrl,
    coverColor}: Course) => {
  return (  
    <section className='flex flex-col-reverse items-center gap-12 sm:gap-32 xl:flex-row xl:gap-8'> 
        <div className='flex flex-1 flex-col gap-5' style={{ color: '#e7dfcf' }}>
            <h1 className='text-5xl font-bold' style={{ color: '#e7dfcf' }}> {title} </h1>

            <div className='mt-7 flex flex-row flex-wrap gap-4 text-xl text-light-100'>
                <p>
                    By: <span className='font-semibold' style={{ color: '#c3b091' }}> {author} </span>
                </p>
                <p>
                    Category: <span className='font-semibold' style={{ color: '#c3b091' }}> {genre} </span>
                </p>

                <div className='flex flex-row gap-1'>
                    <Image src ='/icons/star.svg' alt='star' width={22} height={22}></Image> 
                    <p className='font-semibold' style={{ color: '#c3b091' }}>{rating}</p>
                </div>  
            </div>

            <div className='flex flex-row flex-wrap gap-4 mt-1'>
                    <p className='mt-2 text-justify text-xl text-light-100'>Duration: <span className='font-semibold text-light-200' style={{ color: '#c3b091' }}> {totalCopies} </span> min </p>
            </div>

            <p className='mt-2 text-justify text-xl text-light-100' > {description} </p>

            <Link href={`/piano`}>  
            <Button variant="khaki" className="py-4">
              <Image src='/icons/book.svg' alt='book' width={20} height={20} />
              <p className='text-xl text-dark-100' style={{ color: '#0a1128', fontFamily: 'var(--bebas-neue)'}}>Take Course</p>
            </Button>
            </Link>
            
        </div>

        <div className='relative flex flex-1 justify-center'>
            <div className='relative'>
                <CourseCover
                    variant="wide"
                    className="z-10"
                    coverImage={coverUrl}
                    coverColor={coverColor}
                />
            </div>

            <div className='absolute left-65 top-10 rotate-12 opacity-40 max-sm:hidden'>
            <CourseCover
                    variant="wide"
                    coverImage={coverUrl}
                    coverColor={coverColor}
                />
            </div>

        </div>

    </section>
    );
};

export default BookOverview;
