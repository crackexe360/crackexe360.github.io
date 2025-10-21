document.addEventListener('DOMContentLoaded', function () {

    // ==========================
    // 🎯 SKILLS CHARTS
    // ==========================
    const skillsChartCtx = document.getElementById('skillsChart').getContext('2d');
    new Chart(skillsChartCtx, {
        type: 'doughnut',
        data: {
            labels: ['Network Security', 'Web Security', 'Cloud Security', 'Cryptography', 'Forensic'],
            datasets: [{
                label: 'Core Competencies',
                data: [25, 30, 25, 15, 20],
                backgroundColor: ['#10B981', '#3B82F6', '#F97316', '#8B5CF6', '#fd3636ff', '#46ff03ff'],
                borderColor: '#1f2937',
                borderWidth: 4,
                hoverOffset: 12
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#D1D5DB',
                        font: { family: "'Inter', sans-serif" }
                    }
                },
                tooltip: {
                    bodyFont: { family: "'Inter', sans-serif" },
                    titleFont: { family: "'Inter', sans-serif" },
                }
            }
        }
    });

    const vulnsChartCtx = document.getElementById('vulnsChart').getContext('2d');
    new Chart(vulnsChartCtx, {
        type: 'doughnut',
        data: {
            labels: ['OWASP Top 10', 'Auth Flaws', 'SQLi / XSS', 'Memory Corruption', 'Config Errors'],
            datasets: [{
                label: 'Vulnerability Focus',
                data: [35, 25, 20, 15, 5],
                backgroundColor: ['#0EA5E9', '#EC4899', '#EAB308', '#6366F1', '#6B7280'],
                borderColor: '#1f2937',
                borderWidth: 4,
                hoverOffset: 12
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#D1D5DB',
                        font: { family: "'Inter', sans-serif" }
                    }
                },
                tooltip: {
                    bodyFont: { family: "'Inter', sans-serif" },
                    titleFont: { family: "'Inter', sans-serif" },
                }
            }
        }
    });

    const proficiencyRadarChartCtx = document.getElementById('proficiencyRadarChart').getContext('2d');
    new Chart(proficiencyRadarChartCtx, {
        type: 'radar',
        data: {
            labels: ['Network Security', 'Web Security', 'Reverse Engineering', 'Cryptography', 'Forensic', 'Cloud Security', 'Automation'],
            datasets: [{
                label: 'Proficiency Level',
                data: [90, 90, 50, 60, 95, 90, 95],
                backgroundColor: 'rgba(52, 211, 153, 0.2)',
                borderColor: '#34D399',
                pointBackgroundColor: '#34D399',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#34D399',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: { color: '#4B5563' },
                    grid: { color: '#4B5563' },
                    pointLabels: {
                        color: '#D1D5DB',
                        font: { family: "'Inter', sans-serif" }
                    },
                    ticks: {
                        display: false,
                        beginAtZero: true,
                        max: 100
                    }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    bodyFont: { family: "'Inter', sans-serif" },
                    titleFont: { family: "'Inter', sans-serif" },
                    callbacks: {
                        label: context => `${context.label}: ${context.raw}%`
                    }
                }
            }
        }
    });

    // ==========================
    // 🖥️ TERMINAL ANIMATION
    // ==========================
 const terminal = document.getElementById('terminal');

// 🔹 Add terminal height here
terminal.style.height = '500px'; // You can change to any size like '600px' or '80vh'

const commandSequence = [
    { command: 'whoami', response: 'Waleed Abdullah - Cybersecurity Specialist & Red Teamer' },
    { command: 'ls -la /skills', response: 'Penetration_Testing Web_Security Cloud_Security Network_Security' },
    { command: 'nmap --top-ports 10 localhost', response: 'Starting Nmap 7.92...\nPORT      STATE SERVICE\n22/tcp    open  ssh\n80/tcp    open  http\n443/tcp   open  https\n3306/tcp  open  mysql\nNmap done.' },
    { command: 'python exploit.py --target vulnerable.site.com', response: 'Exploit completed successfully' },
    { command: 'cat flag.txt', response: 'HTB{this_is_a_fake_flag}' },
    { command: 'ls -F /Certifications/', response: 'EC-Council-CEH/  Tryhackme-PT1/ ' }
];

let sequenceIndex = 0;

function addLine(text = '', isPrompt = false, isResponse = false) {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    if (isPrompt) {
        line.innerHTML = `<span class="text-emerald-400">[root@kali:~]$ </span><span class="command-text text-gray-300"></span><span class="terminal-cursor w-2 h-4 ml-1"></span>`;
    } else if (isResponse) {
        line.className += ' text-cyan-400';
        line.textContent = text;
    } else {
        line.textContent = text;
    }
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
    return line;
}

function typeText(element, text, speed) {
    return new Promise(resolve => {
        let charIndex = 0;
        const typeChar = () => {
            if (charIndex < text.length) {
                element.textContent += text.charAt(charIndex);
                charIndex++;
                terminal.scrollTop = terminal.scrollHeight;
                setTimeout(typeChar, speed);
            } else {
                resolve();
            }
        };
        typeChar();
    });
}

async function clearTerminal() {
    terminal.innerHTML = '';
}

async function runTerminalLoop() {
    while (true) {
        const currentCommand = commandSequence[sequenceIndex];
        const commandLineDiv = addLine('', true);
        const commandTextSpan = commandLineDiv.querySelector('.command-text');
        const cursorSpan = commandLineDiv.querySelector('.terminal-cursor');

        await typeText(commandTextSpan, currentCommand.command, 50);
        cursorSpan.remove();
        await new Promise(r => setTimeout(r, 500));

        const responseLines = currentCommand.response.split('\n');
        for (const responseText of responseLines) {
            addLine(responseText, false, true);
            await new Promise(r => setTimeout(r, 50));
        }

        await new Promise(r => setTimeout(r, 1500));
        sequenceIndex++;

        if (sequenceIndex >= commandSequence.length) {
            sequenceIndex = 0;
            await clearTerminal();
        }
    }
}

runTerminalLoop();


    // ==========================
    // 📱 MOBILE NAV MENU
    // ==========================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenuBtn.innerHTML = mobileMenu.classList.contains('hidden')
            ? `<i class="fas fa-bars"></i>`
            : `<i class="fas fa-times"></i>`;
    });
    
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenuBtn.innerHTML = `<i class="fas fa-bars"></i>`;
        });
    });

    // ==========================
    // 🌟 SCROLL ANIMATION & ACTIVE LINKS
    // ==========================
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section-fade-in').forEach(section => observer.observe(section));

    const navLinks = document.querySelectorAll('header nav a');
    window.addEventListener('scroll', () => {
        let current = '';
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 100) current = section.getAttribute('id');
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) link.classList.add('active');
        });
    });

    // ==========================
    // ✨ PARTICLE BACKGROUND
    // ==========================
    particlesJS("particles-js", {
        particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: "#34D399" },
            shape: { type: "circle" },
            opacity: { value: 0.3, random: true },
            size: { value: 2, random: true },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#4B5563",
                opacity: 0.2,
                width: 1
            },
            move: { enable: true, speed: 1, direction: "none", random: true, straight: false, out_mode: "out" }
        },
        interactivity: {
            detect_on: "canvas",
            events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: false } },
            modes: { grab: { distance: 140, line_opacity: 0.5 } }
        },
        retina_detect: true
    });

});
