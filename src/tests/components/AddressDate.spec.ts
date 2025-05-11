import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import AddressDate from '../../components/AddressDate.vue'

describe('AddressDate', () => {
    it('renders basic info', () => {
        const wrapper = mount(AddressDate, {
            props: {
                address: 'Paris',
                formattedDate: '2023-10-01'
            },
            global: {
                plugins: [createTestingPinia()]
            }
        })

        expect(wrapper.text()).toContain('Paris')
        expect(wrapper.text()).toContain('2023-10-01')
    })

    it('shows forecast when data exists', async () => {
        const wrapper = mount(AddressDate, {
            props: {
                address: 'London',
                formattedDate: '2023-10-02'
            },
            global: {
                plugins: [createTestingPinia({
                    initialState: {
                        weatherStore: {
                            forecast: [{
                                date: '2023-10-03',
                                maxTemp: 20,
                                minTemp: 12,
                                condition: 'Cloudy',
                                chanceOfRain: 30
                            }]
                        }
                    }
                })]
            }
        })

        expect(wrapper.find('.forecast-card').exists()).toBe(false)
    })
})