// GitHub Pages compatibility guard
window.addEventListener('error', function (event) {
    console.error('NJ Interior JavaScript error:', event.error || event.message);
    document.querySelectorAll('.project-card').forEach(function(card) {
        card.style.opacity = '1';
        card.style.transform = 'none';
    });
});

// Sample Project Dataset (4 Core Detailed Templates)
        const projectsData = [
            {
                id: 1,
                name: "Modern Floating TV Panel Design",
                category: "TV Unit",
                location: "Kamarajapuram, Pudukkottai",
                desc: "A sleek wooden TV panel built with backlit LED profile light features and floating cabinet consoles designed for spacious urban living rooms.",
                mainImage: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=500&q=80",
                extendedImages: [
                    "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=500&q=80",
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=500&q=80"
                ]
            },
            {
                id: 2,
                name: "Ambient Light Gypsum False Ceiling",
                category: "False Ceiling",
                location: "Nizam Colony, Pudukkottai",
                desc: "An elegant warm-white layered false ceiling customized with premium spot lights and durable plasterboards.",
                mainImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=500&q=80",
                extendedImages: [
                    "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=500&q=80",
                    "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=500&q=80"
                ]
            },
            {
                id: 3,
                name: "High-Gloss Sliding Wardrobe Setup",
                category: "Wardrobe",
                location: "Alangudi, Pudukkottai",
                desc: "Space-saving heavy duty 3-track sliding wardrobes built with soft-closing hinges and custom luxury laminate finishes.",
                mainImage: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=500&q=80",
                extendedImages: [
                    "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=500&q=80"
                ]
            },
            {
                id: 4,
                name: "L-Shaped Modular Kitchen Cabinets",
                category: "Kitchen Cabinet",
                location: "Aranthangi, Pudukkottai",
                desc: "An ergonomic layout featuring water-resistant plywood cabinets, acrylic shutters, and heavy-load hydraulic baskets.",
                mainImage: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=500&q=80",
                extendedImages: [
                    "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=500&q=80",
                    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=500&q=80"
                ]
            }
        ];

        // Parameters to generate mock localized projects for a total of 30 projects
        const categories = ["TV Unit", "False Ceiling", "Wardrobe", "Kitchen Cabinet"];
        const areas = ["Pudukkottai Town", "Alangudi", "Aranthangi", "Karambakkudi", "Gandarvakottai", "Thirumayam", "Viralimalai"];
        const imagePlaceholders = [
            "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=500&q=80",
            "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=500&q=80",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=500&q=80",
            "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=500&q=80"
        ];

        // Generate additional localized project entries for SEO crawling
        let fullProjectsList = [...projectsData];
        for (let i = 5; i <= 30; i++) {
            const randomCategory = categories[(i % categories.length)];
            const randomArea = areas[(i % areas.length)];
            const randomImg = imagePlaceholders[(i % imagePlaceholders.length)];
            
            fullProjectsList.push({
                id: i,
                name: `Premium ${randomCategory} Interior Design`,
                category: randomCategory,
                location: `${randomArea}, Pudukkottai`,
                desc: `This project is a custom local installation by NJ Interior. It represents standard modern styling for homes in ${randomArea}, Pudukkottai. We customized the layouts using highly durable local materials.`,
                mainImage: randomImg,
                extendedImages: [
                    randomImg,
                    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=500&q=80"
                ]
            });
        }

        // Render projects to Grid with precise Schema.org Microdata for SEO indexability
        const grid = document.getElementById('projectsGrid');
        
        function renderProjects() {
            fullProjectsList.forEach(project => {
                const card = document.createElement('article');
                card.className = 'project-card';
                card.setAttribute('data-id', project.id);
                
                // SEO Metadata tags injected directly on each element
                card.setAttribute('itemscope', '');
                card.setAttribute('itemtype', 'https://schema.org/CreativeWork');
                
                card.innerHTML = `
                    <div class="project-image">
                        <img itemprop="image" src="${project.mainImage}" alt="${project.name} by NJ Interior in ${project.location}" loading="lazy">
                    </div>
                    <div class="project-info">
                        <div class="project-category" itemprop="genre">${project.category}</div>
                        <h3 class="project-name" itemprop="name">${project.name}</h3>
                        <div class="project-location" itemprop="contentLocation" itemscope itemtype="https://schema.org/Place">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--accent-color)">
                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                            </svg>
                            <span itemprop="name">${project.location}</span>
                        </div>
                        <meta itemprop="abstract" content="${project.desc}">
                    </div>
                `;
                // Open modal on click
                card.addEventListener('click', () => openModal(project));
                grid.appendChild(card);
            });
        }

        renderProjects();

        // Safe scroll reveal. The page remains visible even if IntersectionObserver
        // is unavailable (important for static hosting/browser compatibility).
        try {
            if ('IntersectionObserver' in window) {
                document.documentElement.classList.add('js-reveal');

                const revealOptions = {
                    threshold: 0.1,
                    rootMargin: "0px 0px -50px 0px"
                };

                const observer = new IntersectionObserver((entries, observerInstance) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('revealed');
                            observerInstance.unobserve(entry.target);
                        }
                    });
                }, revealOptions);

                document.querySelectorAll('.project-card').forEach(card => {
                    observer.observe(card);
                });
            }
        } catch (error) {
            console.warn('Scroll reveal disabled:', error);
            document.querySelectorAll('.project-card').forEach(card => {
                card.classList.add('revealed');
            });
        }

        // Modal Functionality
        const modal = document.getElementById('projectModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalLoc = document.getElementById('modalLoc');
        const modalDesc = document.getElementById('modalDesc');
        const modalGallery = document.getElementById('modalGallery');

        function openModal(project) {
            modalTitle.innerText = project.name;
            modalLoc.innerText = `📍 Location: ${project.location}`;
            modalDesc.innerText = project.desc;
            
            modalGallery.innerHTML = '';
            
            project.extendedImages.forEach(imgUrl => {
                const img = document.createElement('img');
                img.src = imgUrl;
                img.alt = `${project.name} design in ${project.location}`;
                modalGallery.appendChild(img);
            });

            modal.style.display = 'flex';
        }

        function closeModal() {
            modal.style.display = 'none';
        }

        window.onclick = function(event) {
            if (event.target === modal) {
                closeModal();
            }
        }

        // Handle Form Submissions
        function handleFormSubmit(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service').value;
            
            alert(`Thank you, ${name}! Your request regarding "${service}" has been received. Our team in Pudukkottai will call you back on ${phone}.`);
            event.target.reset();
        }

        // Chatbot Widget Logic
        const chatWindow = document.getElementById('chatWindow');
        const chatBody = document.getElementById('chatBody');

        function toggleChat() {
            chatWindow.style.display = (chatWindow.style.display === 'flex') ? 'none' : 'flex';
        }

        function botRespond(option) {
            let userMessage = "";
            let botReply = "";

            if (option === 'estimate') {
                userMessage = "Can I get a pricing estimate?";
                botReply = "Estimations depend on your space requirements. Our TV Units start around ₹25,000, False Ceilings at ₹95/sq.ft, and Kitchen Cabinets from ₹1.2 Lakhs. Drop your phone number in our inquiry form so we can call and discuss a free plan!";
            } else if (option === 'location') {
                userMessage = "Where is your Pudukkottai branch?";
                botReply = "We are headquartered near Main Road, Pudukkottai. We construct and install structures directly across Pudukkottai, Alangudi, and Aranthangi areas.";
            } else if (option === 'services') {
                userMessage = "What services do you offer?";
                botReply = "We specialize in personalized modular kitchen cabinets, TV Units, heavy-duty wardrobes, and modern plasterboard false ceilings.";
            }

            const userBubble = document.createElement('div');
            userBubble.className = 'chat-bubble user';
            userBubble.innerText = userMessage;
            chatBody.appendChild(userBubble);

            setTimeout(() => {
                const botBubble = document.createElement('div');
                botBubble.className = 'chat-bubble bot';
                botBubble.innerText = botReply;
                chatBody.appendChild(botBubble);
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 500);

            chatBody.scrollTop = chatBody.scrollHeight;
        }
