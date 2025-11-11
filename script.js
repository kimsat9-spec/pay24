// 모바일 네비게이션 토글
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// 스크롤 시 헤더 스타일 변경
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
    }
});

// 부드러운 스크롤
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // 모바일 메뉴 닫기
            navMenu.classList.remove('active');
        }
    });
});

// 스크롤 애니메이션
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 애니메이션 적용할 요소들
const animateElements = document.querySelectorAll('.service-card, .feature-item, .step');

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// 폼 제출 처리
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // 폼 데이터 수집
    const formData = new FormData(contactForm);
    const data = {
        name: contactForm.querySelector('input[type="text"]').value,
        phone: contactForm.querySelector('input[type="tel"]').value,
        amount: contactForm.querySelector('input[type="number"]').value,
        message: contactForm.querySelector('textarea').value
    };

    // 실제 환경에서는 여기서 서버로 데이터를 전송합니다
    console.log('상담 신청 데이터:', data);
    
    // 성공 메시지 표시
    alert('상담 신청이 완료되었습니다!\n곧 연락드리겠습니다.');
    
    // 폼 초기화
    contactForm.reset();
});

// 숫자 카운트 애니메이션
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString() + (element.textContent.includes('%') ? '%' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString() + (element.textContent.includes('%') ? '%' : '+');
        }
    }, 16);
};

// 통계 숫자 애니메이션
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;
            
            if (text.includes('만')) {
                const num = parseFloat(text) * 10000;
                statNumber.textContent = '0';
                setTimeout(() => animateCounter(statNumber, num), 100);
            } else if (text.includes('%')) {
                const num = parseFloat(text);
                statNumber.textContent = '0%';
                setTimeout(() => {
                    let current = 0;
                    const timer = setInterval(() => {
                        current += 0.1;
                        if (current >= num) {
                            statNumber.textContent = num.toFixed(1) + '%';
                            clearInterval(timer);
                        } else {
                            statNumber.textContent = current.toFixed(1) + '%';
                        }
                    }, 20);
                }, 100);
            } else {
                // 24시간 같은 경우는 그대로 유지
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(item => {
    statsObserver.observe(item);
});

// 페이지 로드 시 초기화
window.addEventListener('load', () => {
    // 로딩 애니메이션 등 추가 초기화 작업
    document.body.style.opacity = '1';
});

