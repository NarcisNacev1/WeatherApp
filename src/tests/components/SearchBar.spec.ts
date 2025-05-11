import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import SearchBar from '../../components/SearchBar.vue'
import { useWeatherStore } from '../../stores/weatherStore'

describe('SearchComponent', () => {
    let wrapper: any
    let weatherStore: any

    beforeEach(() => {
        wrapper = mount(SearchBar, {
            global: {
                plugins: [createTestingPinia()],
            },
        })
        weatherStore = useWeatherStore()
    })

    it('renders basic elements', () => {
        expect(wrapper.find('input').exists()).toBe(true)
        expect(wrapper.find('.search-icon').exists()).toBe(true)
        expect(wrapper.find('.search-button').exists()).toBe(true)
    })

    it('emits city-searched event on valid input', async () => {
        weatherStore.city = 'London'
        await wrapper.find('.search-button').trigger('click')
        expect(wrapper.emitted('city-searched')).toEqual([['London']])
    })

    it('doesnt emit event with empty input', async () => {
        weatherStore.city = '   '
        await wrapper.find('.search-button').trigger('click')
        expect(wrapper.emitted('city-searched')).toBeUndefined()
    })

    it('shows loading spinner when isLoading is true', async () => {
        weatherStore.isLoading = true
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.animate-spin').exists()).toBe(true)
    })

    it('displays error message when error exists', async () => {
        weatherStore.error = 'City not found'
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.error-message').text()).toBe('City not found')
    })

    it('toggles focused class on input focus/blur', async () => {
        const input = wrapper.find('input')
        await input.trigger('focus')
        expect(wrapper.find('.city').classes()).toContain('focused')

        await input.trigger('blur')
        expect(wrapper.find('.city').classes()).not.toContain('focused')
    })

    it('calls fetchUserLocation on location icon click', async () => {
        weatherStore.fetchUserLocation = vi.fn()
        await wrapper.find('.search-icon').trigger('click')
        expect(weatherStore.fetchUserLocation).toHaveBeenCalled()
    })
})