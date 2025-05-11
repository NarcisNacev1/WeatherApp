import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import Temperature from '../../components/Temperature.vue'
import { useWeatherStore } from '../../stores/weatherStore'

describe('TemperatureDisplay', () => {
    let wrapper: any
    let weatherStore: any

    beforeEach(() => {
        wrapper = mount(Temperature, {
            props: { temperature: 20 },
            global: {
                plugins: [createTestingPinia()],
            },
        })
        weatherStore = useWeatherStore()
    })

    it('displays temperature with correct color', async () => {
        const tests = [
            { temp: 35, color: '#ff3d00' },
            { temp: 27, color: '#ff9100' },
            { temp: 20, color: '#ffea00' },
            { temp: 10, color: '#76ff03' },
            { temp: 0, color: '#00b0ff' },
            { temp: -10, color: '#2979ff' }
        ]

        for (const test of tests) {
            await wrapper.setProps({ temperature: test.temp })
            const h3 = wrapper.find('h3')
            expect(h3.attributes('style')).toContain(`color: ${test.color}`)
        }
    })

    it('shows weather condition from store', async () => {
        weatherStore.weatherCondition = 'Light Rain'
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.weather-condition').text()).toBe('Light Rain')
    })

    it('displays humidity and wind details when available', async () => {
        weatherStore.humidity = 65
        weatherStore.windSpeed = 12
        await wrapper.vm.$nextTick()

        expect(wrapper.find('.weather-details').exists()).toBe(true)
        expect(wrapper.text()).toContain('65%')
        expect(wrapper.text()).toContain('12 km/h')
    })

    it('hides details when no humidity/wind data', async () => {
        weatherStore.humidity = null
        weatherStore.windSpeed = null
        await wrapper.vm.$nextTick()
        expect(wrapper.find('.weather-details').exists()).toBe(false)
    })

    it('rounds temperature correctly', async () => {
        await wrapper.setProps({ temperature: 19.6 })
        expect(wrapper.text()).toContain('20oC')
        await wrapper.setProps({ temperature: 24.3 })
        expect(wrapper.text()).toContain('24oC')
    })
})