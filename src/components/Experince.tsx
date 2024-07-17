'use strict';
'use client';
import { useState } from 'react';

const experience = [
    `                                                       
                      @@@@@@@@@@                      
                     @@@@@*:@@@@@                     
                     @#*@+**-@:@@                     
             @#@@@  @@@**@**@:*@@   @@@*@             
          @@+@@@:@@@@@*%*@**@*.%@@@@@:@@@+@@          
@@@@@@@@@@@@@@*@*:#*@@@@@***:@#@@@**:*@*@@@@@@@@@@@%@@    Company Name: Team Hydra
   @@@%%@@***********@@********@@**+*******+@@**@@@       Position: Software Developer
      @@@#%@********+*@********@*************@@@          Start Date: 2020-09-01
        @@@@%********.*@*%**@*@+.*********@@@@            End: Present
         @@@@#**@*%**+@@*@@@@+@@+****@**+@@@@             About:
          @@@@**@@*****@@*@@=@@*****@@%*@@@@              I've worked with team hydra on a variety of projects,
          @  @@+*@@@*****@#@@*****@@@#*@@  @              including developing web applications, mobile apps, discord bots, 
          @@@ @@%%@@@@@***@@***@@@@@%@@@ @@@              and APIs. It's a great team to work with, and I've learned a lot.
               @@@%@@@@*****+**@@@@%@@@                   I highly recommend them to anyone looking for software development 
               @@@%%%***#@**@****%%%@@@                   services and a career in software development.
              @@@@@@@@@@@@@@@@@@@@@@@@@@              
                @@                  @@                             
   `,
    `
             *###########*           
           ################*         
          ########   *####           
         ######         *            
        *####*                       
        #####      #########         
        #####      #########    ordon food services
        #####*     #########    Position: Network Engineer/IT Specialist
         ######        *####    Start Date: 2022-06-01
          #######*   =######    End: 2024-06-01
           #################    About: I worked with Gordon food services to help maintain their network infrastructure
             ############*      and provide IT support to their employees. I was responsible for troubleshooting network
                #######         issues, setting up new network equipment, and providing support to employees with IT issues.
                  ####          I was laid off, but I enjoyed my time there and learned a lot about network engineering and 
                     *          IT support.
   `,
];

export default function Experience() {
    const [index, setIndex] = useState(0);

    const handleNext = () => {
        if (index < experience.length - 1) {
            setIndex(index + 1);
        }
    };

    const handlePrev = () => {
        if (index > 0) {
            setIndex(index - 1);
        }
    };

    return (
        <div>
            <h1 className='text-2xl font-bold font-mono'>Experience</h1>
            <p className='text-gray-500'>
                Use the buttons below to navigate through my experience.
            </p>
            <div className='flex justify-between'>
                <button
                    onClick={handlePrev}
                    className='text-blue-500 hover:underline'
                    disabled={index === 0}
                >
                    Previous
                </button>
                <button
                    onClick={handleNext}
                    className='text-blue-500 hover:underline'
                    disabled={index === experience.length - 1}
                >
                    Next
                </button>
            </div>
            <div className=''>
                <pre className='whitespace-pre-wrap'>{experience[index]}</pre>
            </div>
        </div>
    );
}
