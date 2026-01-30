<template>
  <div class="font-mono">
    <h1 class="text-2xl font-bold mb-2">Experience</h1>
    <p class="text-terminal-dim mb-4">
      Use the buttons below to navigate through my experience.
    </p>
    <div class="flex justify-between mb-4">
      <button
        @click="handlePrev"
        :disabled="index === 0"
        class="text-terminal-dim hover:text-terminal transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <button
        @click="handleNext"
        :disabled="index === experience.length - 1"
        class="text-terminal-dim hover:text-terminal transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
    <div>
      <pre class="whitespace-pre-wrap text-terminal">{{ experience[index] }}</pre>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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
]

const index = ref(0)

const handleNext = () => {
  if (index.value < experience.length - 1) {
    index.value++
  }
}

const handlePrev = () => {
  if (index.value > 0) {
    index.value--
  }
}
</script>
