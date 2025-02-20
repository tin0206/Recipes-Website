<template>
    <div class="footer-container my-32 flex">
        <div class="brand flex">
            <img src="/public/landingpage/Footer-Logo.png" alt="" />
            <h1 class="text-2xl font-bold dark:text-white">Recipe Haven</h1>            
        </div>
        <div class="list">
            <ul class="main-list flex">
                <li>
                    <h1 class="text-lg font-bold dark:text-white">Product</h1>
                    <ul class="list-product">
                        <li><a href="#">Features</a></li>
                        <li><a href="#">Pricing</a></li>
                    </ul>
                </li>
                <li>
                    <h1 class="text-lg font-bold dark:text-white">Resources</h1>
                    <ul class="list-resources">
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">User guides</a></li>
                        <li><a href="#">Webinars</a></li>
                    </ul>
                </li>
                <li>
                    <h1 class="text-lg font-bold dark:text-white">Company</h1>
                    <ul class="list-company">
                        <li><a href="https://www.facebook.com/nguyen.tin.842409">About us</a></li>
                        <li><a href="https://m.me/nguyen.tin.842409">Contact us</a></li>
                    </ul>
                </li>
                <li>
                    <h1 class="text-lg font-bold dark:text-white">Plan & Pricing</h1>
                    <ul class="list-plans-pricing">
                        <li><a href="#">Personal</a></li>
                        <li><a href="#">Start up</a></li>
                        <li><a href="#">Organization</a></li>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="bottombar flex">
            <div class="author">
                <h1 class="text-lg font-bold dark:text-white">Nguyễn Trung Tín</h1>
            </div>
            <div class="copyrights flex">
                <div>© 2025 Recipe Haven, Vie.</div>
                <div>
                    <ul class="flex list-disc">
                        <li><a href="#">Privacy</a></li>
                        <li><a href="#">Terms</a></li>
                        <li><a href="#">Sitemap</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
.footer-container {
    flex-direction: column;
    align-items: center;

    .brand {
        align-items: center;
        gap: 10px;
        img {
            width: 50px;
            height: 50px;
        }
    }

    .main-list {
        justify-content: center;
        flex-wrap: wrap;
        margin-top: 50px;
        gap: 100px;
        li {
            width: 130px;
            ul {
                margin-top: 10px;
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
        }
    }

    .bottombar {
        margin-top: 50px;
        align-items: center;
        justify-content: space-between;  
        gap: 100px;

        .copyrights {
            gap: 35px;
            ul {
                gap: 30px;
            }
        }
    }
}

@media (max-width: 1024px) {
    .main-list {
        gap: 50px;
    }

    .bottombar {
        flex-direction: column;
        gap: 20px;
    }
}

@media (max-width: 905px) {
    .main-list {
        align-items: center;
        text-align: center;
        gap: 100px !important;
        li {
            width: 250px !important;
        }
    }
}

@media (max-width: 768px) {
    .main-list {
        flex-direction: column;
        align-items: center;
        gap: 30px;
    }

    .bottombar {
        flex-direction: column;
        text-align: center;
        gap: 20px;
    }
}

@media (max-width: 480px) {
    .brand img {
        width: 40px;
        height: 40px;
    }
    
    .main-list li {
        width: 100%;
        text-align: center;
    }
}
</style>