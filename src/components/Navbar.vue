<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router';
import { useDark, useToggle } from "@vueuse/core";

// const darkMode = useDark();
// const toggelDark = useToggle(darkMode)
const router = useRouter()
const name = ref()
onMounted(() => {
    if (localStorage.user) {
        name.value = localStorage.user;
    }
})

// function logOut() {
//     localStorage.setItem("auth", false);
//     localStorage.setItem("user", '');
//     router.push({ path: '/login' });
//     location.reload()
// }
</script>

<template>
    <nav
        class="flex mx-auto w-auto px-2 py-2 lg:px-10 justify-between navbar bg-neutral text-neutral-content items-center">
        <div class="flex items-center">
            <svg height="50px" width="50px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 511.985 511.985" xml:space="preserve"
                fill="#000000" stroke="#000000">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <path style="fill:#fe2036;"
                        d="M491.859,156.348c-12.891-30.483-31.342-57.865-54.842-81.372 c-23.516-23.5-50.904-41.96-81.373-54.85c-31.56-13.351-65.091-20.125-99.652-20.125c-34.554,0-68.083,6.773-99.645,20.125 c-30.483,12.89-57.865,31.351-81.373,54.85c-23.499,23.507-41.959,50.889-54.85,81.372C6.774,187.91,0,221.44,0,255.993 c0,34.56,6.773,68.091,20.125,99.652c12.89,30.469,31.351,57.857,54.85,81.357c23.507,23.516,50.889,41.967,81.373,54.857 c31.562,13.344,65.091,20.125,99.645,20.125c34.561,0,68.092-6.781,99.652-20.125c30.469-12.891,57.857-31.342,81.373-54.857 c23.5-23.5,41.951-50.889,54.842-81.357c13.344-31.561,20.125-65.092,20.125-99.652C511.984,221.44,505.203,187.91,491.859,156.348z ">
                    </path>
                    <path style="fill:#ffffff;"
                        d="M0.102,263.18c0.875,32.014,7.593,63.092,20.023,92.465c12.89,30.469,31.351,57.857,54.85,81.357 c23.507,23.516,50.889,41.967,81.373,54.857c31.562,13.344,65.091,20.125,99.645,20.125c34.561,0,68.092-6.781,99.652-20.125 c30.469-12.891,57.857-31.342,81.373-54.857c23.5-23.5,41.951-50.889,54.842-81.357c12.438-29.373,19.156-60.451,20.031-92.465 H0.102z">
                    </path>
                    <path style="fill:#292d32;"
                        d="M510.765,281.211c0.812-8.344,1.219-16.75,1.219-25.218c0-9.516-0.516-18.953-1.531-28.289 c-12.719,1.961-30.984,4.516-53.998,7.054c-43.688,4.82-113.904,10.57-200.463,10.57c-86.552,0-156.776-5.75-200.455-10.57 c-23.022-2.539-41.28-5.093-53.998-7.054C0.516,237.04,0,246.478,0,255.993c0,8.468,0.406,16.875,1.219,25.218 c41.53,6.25,133.027,17.436,254.773,17.436S469.234,287.461,510.765,281.211z">
                    </path>
                    <path style="fill:#ffffff;"
                        d="M309.334,266.656c0,29.459-23.891,53.334-53.342,53.334c-29.452,0-53.334-23.875-53.334-53.334 c0-29.453,23.882-53.327,53.334-53.327C285.443,213.33,309.334,237.204,309.334,266.656z">
                    </path>
                    <path style="fill:#292d32;"
                        d="M255.992,170.66c-52.936,0-95.997,43.069-95.997,95.997s43.062,95.988,95.997,95.988 s95.996-43.061,95.996-95.988C351.988,213.729,308.928,170.66,255.992,170.66z M255.992,309.335 c-23.522,0-42.663-19.156-42.663-42.678c0-23.523,19.14-42.663,42.663-42.663c23.531,0,42.654,19.14,42.654,42.663 C298.646,290.178,279.523,309.335,255.992,309.335z">
                    </path>
                    <path style="opacity:0.2;fill:#FFFFFF;enable-background:new ;"
                        d="M491.859,156.348c-12.891-30.483-31.342-57.865-54.842-81.372 c-23.516-23.5-50.904-41.96-81.373-54.85c-31.56-13.351-65.091-20.125-99.652-20.125c-3.57,0-7.125,0.078-10.664,0.219 c30.789,1.25,60.662,7.93,88.974,19.906c30.498,12.89,57.873,31.351,81.371,54.85c23.5,23.507,41.969,50.889,54.857,81.372 c13.359,31.562,20.109,65.092,20.109,99.646c0,34.56-6.75,68.091-20.109,99.652c-12.889,30.469-31.357,57.857-54.857,81.357 c-23.498,23.516-50.873,41.967-81.371,54.857c-28.312,11.969-58.186,18.656-88.974,19.906c3.539,0.141,7.093,0.219,10.664,0.219 c34.561,0,68.092-6.781,99.652-20.125c30.469-12.891,57.857-31.342,81.373-54.857c23.5-23.5,41.951-50.889,54.842-81.357 c13.344-31.561,20.125-65.092,20.125-99.652C511.984,221.44,505.203,187.91,491.859,156.348z">
                    </path>
                    <path style="opacity:0.1;enable-background:new ;"
                        d="M20.125,355.645c12.89,30.469,31.351,57.857,54.85,81.357 c23.507,23.516,50.889,41.967,81.373,54.857c31.562,13.344,65.091,20.125,99.645,20.125c3.57,0,7.125-0.078,10.664-0.219 c-30.789-1.25-60.67-7.938-88.982-19.906c-30.483-12.891-57.857-31.342-81.364-54.857c-23.507-23.5-41.96-50.889-54.858-81.357 c-13.352-31.56-20.117-65.091-20.117-99.652c0-34.554,6.765-68.084,20.116-99.646C54.35,125.864,72.803,98.481,96.31,74.983 c23.507-23.507,50.881-41.968,81.364-54.858c28.312-11.976,58.193-18.656,88.982-19.906c-3.539-0.14-7.094-0.218-10.664-0.218 c-34.554,0-68.083,6.773-99.645,20.125c-30.483,12.89-57.865,31.351-81.373,54.858c-23.499,23.499-41.959,50.881-54.85,81.364 C6.774,187.91,0,221.44,0,255.993C0,290.553,6.774,324.085,20.125,355.645z">
                    </path>
                </g>
            </svg>
            <div class="dropdown ml-4">
                <div tabindex="0" role="button"
                    class="btn border-neutral-content border-4 italic font-mono text-xl  bg-clip-text text-transparent bg-gradient-to-r from-accent to-secondary font-black lg:text-4xl">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 lg:hidden stroke-base-300" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                    <p class=""></p> {{ $route.name }}
                </div>
                <ul tabindex="0"
                    class="lg:hidden menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-fit text-base-content">
                    <li class="mr-6 text-2xl font-bold rounded-md px-2.5 py-1">
                        <RouterLink to="/pokedex">PokeDex</RouterLink>
                    </li>
                    <li class="mr-6 text-2xl font-bold rounded-md px-2.5 py-1">
                        <RouterLink to="/pokecok">PokeCok</RouterLink>
                    </li>
                    <li class="mr-6 text-2xl font-bold rounded-md px-2.5 py-1">
                        <RouterLink to="/pokematch">PokeMatch</RouterLink>
                    </li>
                    <li class="mr-6 text-2xl font-bold rounded-md px-2.5 py-1">
                        <RouterLink to="/pokespin">PokeSpin</RouterLink>
                    </li>
                    <li class="mr-6 text-2xl font-bold rounded-md px-2.5 py-1">
                        <RouterLink to="/pokecards">PokeCards</RouterLink>
                    </li>
                </ul>
            </div>
        </div>
        <ul class="hidden p-1 lg:flex">
            <li
                class="mr-6 text-2xl font-bold rounded-md px-2.5 py-1 hover:text-warning hover:scale-110 transition-all">
                <RouterLink to="/pokedex">PokeDex</RouterLink>
            </li>
            <li
                class="mr-6 text-2xl font-bold rounded-md px-2.5 py-1 hover:text-warning hover:scale-110 transition-all">
                <RouterLink to="/pokecok">PokeCok</RouterLink>
            </li>
            <li
                class="mr-6 text-2xl font-bold rounded-md px-2.5 py-1 hover:text-warning hover:scale-110 transition-all">
                <RouterLink to="/pokematch">PokeMatch</RouterLink>
            </li>
            <li
                class="mr-6 text-2xl font-bold rounded-md px-2.5 py-1 hover:text-warning hover:scale-110 transition-all">
                <RouterLink to="/pokespin">PokeSpin</RouterLink>
            </li>
            <li
                class="mr-6 text-2xl font-bold rounded-md px-2.5 py-1 hover:text-warning hover:scale-110 transition-all">
                <RouterLink to="/pokecards">PokeCards</RouterLink>
            </li>
        </ul>
        <div class="dropdown">
            <div tabindex="0" role="button" class="btn text-xl">
                Theme
                <svg width="12px" height="12px" class="h-2 w-2 fill-current opacity-60 inline-block"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048">
                    <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
                </svg>
            </div>
            <ul tabindex="0"
                class="dropdown-content z-[1] pr-2 mt-3 text-base-content bg-base-200 rounded-b-box text-xl w-max pl-5">
                <li class="flex items-center justify-between indicator">
                    <input type="radio" name="theme-dropdown"
                        class="theme-controller btn btn-sm btn-block btn-ghost justify-start ml-1" aria-label="Light"
                        value="light" />
                    <span data-theme="light"
                        class="indicator-item  indicator-middle indicator-start badge badge-base-300"></span>
                </li>
                <li class="flex items-center justify-between indicator"><input type="radio" name="theme-dropdown"
                        class="theme-controller btn btn-sm btn-block btn-ghost justify-start ml-1" aria-label="Dark"
                        value="dark" />
                    <span data-theme="dark"
                        class="indicator-item  indicator-middle indicator-start badge badge-base-300"></span>
                </li>
                <li class="flex items-center justify-between indicator"><input type="radio" name="theme-dropdown"
                        class="theme-controller btn btn-sm btn-block btn-ghost justify-start ml-1" aria-label="Luxury"
                        value="luxury" />
                    <span data-theme="luxury"
                        class="indicator-item  indicator-middle indicator-start badge badge-base-300"></span>
                </li>
                <li class="flex items-center justify-between indicator"><input type="radio" name="theme-dropdown"
                        class="theme-controller btn btn-sm btn-block btn-ghost justify-start ml-1" aria-label="Retro"
                        value="retro" />
                    <span data-theme="retro"
                        class="indicator-item  indicator-middle indicator-start badge badge-base-300"></span>
                </li>
                <li class="flex items-center justify-between indicator"><input type="radio" name="theme-dropdown"
                        class="theme-controller btn btn-sm btn-block btn-ghost justify-start ml-1"
                        aria-label="Cyberpunk" value="cyberpunk" />
                    <span data-theme="cyberpunk"
                        class="indicator-item  indicator-middle indicator-start badge badge-base-300"></span>
                </li>
                <li class="flex items-center justify-between indicator"><input type="radio" name="theme-dropdown"
                        class="theme-controller btn btn-sm btn-block btn-ghost justify-start ml-1"
                        aria-label="Valentine" value="valentine" /><span data-theme="valentine"
                        class="indicator-item  indicator-middle indicator-start badge badge-base-300"></span></li>
                <li class="flex items-center justify-between indicator"><input type="radio" name="theme-dropdown"
                        class="theme-controller btn btn-sm btn-block btn-ghost justify-start ml-1" aria-label="Aqua"
                        value="aqua" /><span data-theme="aqua"
                        class="indicator-item  indicator-middle indicator-start badge badge-base-300"></span></li>
                <li class="flex items-center justify-between indicator"><input type="radio" name="theme-dropdown"
                        class="theme-controller btn btn-sm btn-block btn-ghost justify-start ml-1" aria-label="Coffee"
                        value="coffee" /><span data-theme="coffee"
                        class="indicator-item  indicator-middle indicator-start badge badge-base-300"></span></li>
                <li class="flex items-center justify-between indicator"><input type="radio" name="theme-dropdown"
                        class="theme-controller btn btn-sm btn-block btn-ghost justify-start ml-1" aria-label="Lemonade"
                        value="lemonade" /><span data-theme="lemonade"
                        class="indicator-item  indicator-middle indicator-start badge badge-base-300"></span></li>
                <li class="flex items-center justify-between indicator"><input type="radio" name="theme-dropdown"
                        class="theme-controller btn btn-sm btn-block btn-ghost justify-start ml-1" aria-label="Sunset"
                        value="sunset" /><span data-theme="sunset"
                        class="indicator-item  indicator-middle indicator-start badge badge-base-300"></span></li>
            </ul>
        </div>
    </nav>

</template>
