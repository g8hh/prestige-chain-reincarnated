var CUSTOM_SAVES = { 
        "1e136 Alligators": "eyJ0YWIiOiJvcHRpb25zLXRhYiIsIm5hdlRhYiI6InRyZWUtdGFiIiwidGltZSI6MTY0MzcwNjY3NDkwNSwibm90aWZ5Ijp7fSwidmVyc2lvblR5cGUiOiJwcmVzdGlnZV9jaGFpbl9yZWluY2FybmF0ZWQiLCJ2ZXJzaW9uIjoiMC4wMDMiLCJ0aW1lUGxheWVkIjo3NDMwLjMyMDAwMDAwMjUzOSwia2VlcEdvaW5nIjp0cnVlLCJoYXNOYU4iOnRydWUsInBvaW50cyI6IjEuMDkzNzk5NDk4ODIxMDg5ZTExNTkiLCJzdWJ0YWJzIjp7ImNoYW5nZWxvZy10YWIiOnt9LCJhY2giOnsibWFpblRhYnMiOiJBY2hpZXZlbWVudHMifSwiYSI6eyJtYWluVGFicyI6IkJ1eWFibGVzIn19LCJsYXN0U2FmZVRhYiI6ImEiLCJ0b2dnbGVLZXlzIjpmYWxzZSwidW5kdWxhdGluZyI6ZmFsc2UsImxhc3RTYXZlIjoxNjQzNzA2NjUyNDc0LCJhcnJvd0hvdGtleXMiOnRydWUsIm1vZFRhYiI6ZmFsc2UsImxhc3RMZXR0ZXJzUHJlc3NlZCI6WyJzIiwiICIsInMiLCIgIiwiICIsImUiLCJlIiwiZSIsIiAiLCIgIiwiICIsIiAiLCJzIiwiICIsInMiLCJzIiwiICIsIiAiLCJzIiwiICIsIiAiLCIgIiwiICIsIiAiLCJzIl0sInRhcmdldFdvcmQiOiJqb2huc29uIiwid29yZHNTcGVsbGVkIjowLCJjdXJyZW50VGltZSI6MTY0MTk1MDUxNzEyMSwic2hvd0J1aWx0SW5TYXZlcyI6ZmFsc2UsImRldiI6e30sInNwYWNlQmFyUGF1c2VzIjp0cnVlLCJwYXVzZWQiOnRydWUsInNoaWZ0QWxpYXMiOmZhbHNlLCJjb250cm9sQWxpYXMiOmZhbHNlLCJpbmZvYm94ZXMiOnt9LCJpbmZvLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjc0MzAuMzIwMDAwMDAyNTM5LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sIm9wdGlvbnMtdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6NzQzMC4zMjAwMDAwMDI1MzksImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiY2hhbmdlbG9nLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjc0MzAuMzIwMDAwMDAyNTM5LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImEiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjIuMzczMTgxNzU2Mzg1OTg2NWUxMzYiLCJiZXN0IjoiMi43MTc1Nzk2NzgxOTc2NzJlMTM2IiwidG90YWwiOiI1LjY0NTQwNzMyNzM4Njc3OWUxMzYiLCJhYnRpbWUiOjAsInRpbWUiOjI3NzguMzc4MDAwMDAwMDU4NCwidGltZXMiOjI4MzMsImF1dG90aW1lcyI6MC44NzcwMDAwMDAwMDA2ODk4LCJyZXNldFRpbWUiOjI3NzguMzc4MDAwMDAwMDU4NCwiZm9yY2VUb29sdGlwIjp0cnVlLCJidXlhYmxlcyI6eyIxMSI6IjU2MSIsIjEyIjoiMjgzIiwiMTMiOiIxNzgiLCIyMSI6IjgwIiwiMjIiOiI3NCIsIjIzIjoiMzYiLCIzMSI6IjIxIiwiMzIiOiIwIiwiMzMiOiIwIn0sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOlsxMSwxMiwxMywxNCwxNSwyMSwyMiwyM10sIm1pbGVzdG9uZXMiOlsxLDIsM10sImxhc3RNaWxlc3RvbmUiOjMsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiIsImFjdGl2ZUNoYWxsZW5nZSI6bnVsbH0sImFjaCI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiNyIsImJlc3QiOiI3IiwidG90YWwiOiIwIiwiYWJ0aW1lIjowLCJ0aW1lIjowLCJ0aW1lcyI6MCwiYXV0b3RpbWVzIjowLCJoaWRkZW5Sb3dzIjowLCJjbGlja2VkWWVldCI6MCwiY29tcGxldGVkUm93cyI6MSwicmVzZXRUaW1lIjo3MTIyLjE4NzAwMDAwMjQ3OCwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7IjExIjoiIiwiMTIiOiIiLCIxMyI6IiJ9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbMTEsMTIsMTMsMTQsMTUsMTYsMTddLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwidHJlZS10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjo3MDkxLjk5NDAwMDAwMjQ2NiwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJibGFuayI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjE0MjguNzA3OTk5OTk5OTk1LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sInNhdmVNZW51T3BlbiI6ZmFsc2V9",
        "Pre-Beaver": "eyJ0YWIiOiJvcHRpb25zLXRhYiIsIm5hdlRhYiI6InRyZWUtdGFiIiwidGltZSI6MTY0Mzk0NjA2MjU2OSwibm90aWZ5Ijp7fSwidmVyc2lvblR5cGUiOiJwcmVzdGlnZV9jaGFpbl9yZWluY2FybmF0ZWQiLCJ2ZXJzaW9uIjoiMC4wMDQiLCJ0aW1lUGxheWVkIjo4ODI2LjgxMDAwMDAwMTg1Mywia2VlcEdvaW5nIjp0cnVlLCJoYXNOYU4iOnRydWUsInBvaW50cyI6IjEuNjgxODE4NjQxMTcyOTE5ZTI5MzEiLCJzdWJ0YWJzIjp7ImNoYW5nZWxvZy10YWIiOnt9LCJhY2giOnsibWFpblRhYnMiOiJBY2hpZXZlbWVudHMifSwiYSI6eyJtYWluVGFicyI6IkJ1eWFibGVzIn0sImIiOnsibWFpblRhYnMiOiJVcGdyYWRlcyJ9fSwibGFzdFNhZmVUYWIiOiJiIiwidG9nZ2xlS2V5cyI6ZmFsc2UsInVuZHVsYXRpbmciOmZhbHNlLCJsYXN0U2F2ZSI6MTY0Mzk0NjA1OTMzNSwiYXJyb3dIb3RrZXlzIjp0cnVlLCJtb2RUYWIiOmZhbHNlLCJsYXN0TGV0dGVyc1ByZXNzZWQiOlsicyIsInMiLCIgIiwicyIsImUiLCIgIiwiICIsIiAiLCJzIiwiICIsIiAiLCJzIiwiICIsIiAiLCIgIiwicyIsIiAiLCIgIiwiICIsIiAiLCIgIiwiICIsIiAiLCIgIiwiICJdLCJ0YXJnZXRXb3JkIjoiam9obnNvbiIsIndvcmRzU3BlbGxlZCI6MCwiY3VycmVudFRpbWUiOjE2NDE5NTA1MTcxMjEsInNob3dCdWlsdEluU2F2ZXMiOmZhbHNlLCJkZXYiOnt9LCJzcGFjZUJhclBhdXNlcyI6dHJ1ZSwicGF1c2VkIjpmYWxzZSwic2hpZnRBbGlhcyI6ZmFsc2UsImNvbnRyb2xBbGlhcyI6ZmFsc2UsImluZm9ib3hlcyI6e30sImluZm8tdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6ODgyNi44MTAwMDAwMDE4NTMsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwib3B0aW9ucy10YWIiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjo4ODI2LjgxMDAwMDAwMTg1MywiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJjaGFuZ2Vsb2ctdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6ODgyNi44MTAwMDAwMDE4NTMsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiYSI6eyJ1bmxvY2tlZCI6dHJ1ZSwicG9pbnRzIjoiMi4yMDkyMTkwODg0NTUzNzY0ZTI1MSIsImJlc3QiOiIyLjIwNzA3NDA3NzU2MTUxNWUyNTEiLCJ0b3RhbCI6IjIuMjA5MjE5MDg4NDU1Mzc2NGUyNTEiLCJhYnRpbWUiOjAsInRpbWUiOjQxNzQuODY4MDAwMDAwNjAxLCJ0aW1lcyI6NDIzMCwiYXV0b3RpbWVzIjowLjM2NzAwMDAwMDAwMDk2OTY2LCJyZXNldFRpbWUiOjQxNzQuODY4MDAwMDAwNjAxLCJmb3JjZVRvb2x0aXAiOnRydWUsImJ1eWFibGVzIjp7IjExIjoiNzU4IiwiMTIiOiIzOTgiLCIxMyI6IjI0MSIsIjIxIjoiMTE4IiwiMjIiOiIxMDkiLCIyMyI6IjY5IiwiMzEiOiI0MSIsIjMyIjoiMjAiLCIzMyI6IjMifSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEyLDEzLDE0LDE1LDIxLDIyLDIzLDI0XSwibWlsZXN0b25lcyI6WzEsMiwzLDRdLCJsYXN0TWlsZXN0b25lIjo0LCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJiIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIwIiwiYmVzdCI6IjAiLCJ0b3RhbCI6IjAiLCJhYnRpbWUiOjAsInRpbWUiOjE4NS44NTIwMDAwMDAwMDA3NywidGltZXMiOjAsImF1dG90aW1lcyI6MCwicmVzZXRUaW1lIjoxODUuODUyMDAwMDAwMDAwNzcsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiYWNoIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiI3IiwiYmVzdCI6IjciLCJ0b3RhbCI6IjAiLCJhYnRpbWUiOjAsInRpbWUiOjAsInRpbWVzIjowLCJhdXRvdGltZXMiOjAsImhpZGRlblJvd3MiOjAsImNsaWNrZWRZZWV0IjowLCJjb21wbGV0ZWRSb3dzIjoxLCJyZXNldFRpbWUiOjg1MTguNjc3MDAwMDAyNTY4LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnsiMTEiOiIiLCIxMiI6IiIsIjEzIjoiIn0sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOlsxMSwxMiwxMywxNCwxNSwxNiwxN10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJ0cmVlLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjg0ODguNDg0MDAwMDAyNjUsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiYmxhbmsiOnsidW5sb2NrZWQiOnRydWUsInRvdGFsIjoiMCIsImJlc3QiOiIwIiwicmVzZXRUaW1lIjoxNDI4LjcwNzk5OTk5OTk5NSwiZm9yY2VUb29sdGlwIjpmYWxzZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbXSwibWlsZXN0b25lcyI6W10sImxhc3RNaWxlc3RvbmUiOm51bGwsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJzYXZlTWVudU9wZW4iOmZhbHNlfQ==",
        "e941 Alligators": "eyJ0YWIiOiJvcHRpb25zLXRhYiIsIm5hdlRhYiI6InRyZWUtdGFiIiwidGltZSI6MTY0NjI4NDIxNTA1Nywibm90aWZ5Ijp7fSwidmVyc2lvblR5cGUiOiJwcmVzdGlnZV9jaGFpbl9yZWluY2FybmF0ZWQiLCJ2ZXJzaW9uIjoiMC4wMDgiLCJ0aW1lUGxheWVkIjo5MDYyLjU5NTAwMDAwMTc2Niwia2VlcEdvaW5nIjp0cnVlLCJoYXNOYU4iOnRydWUsInBvaW50cyI6IjQuMTkyODg3OTYzMzc1OTI5ZTQ0NDI2Iiwic3VidGFicyI6eyJjaGFuZ2Vsb2ctdGFiIjp7fSwiYWNoIjp7Im1haW5UYWJzIjoiQWNoaWV2ZW1lbnRzIn0sImEiOnsibWFpblRhYnMiOiJVcGdyYWRlcyJ9LCJiIjp7Im1haW5UYWJzIjoiVXBncmFkZXMifX0sImxhc3RTYWZlVGFiIjoiYSIsInRvZ2dsZUtleXMiOmZhbHNlLCJ1bmR1bGF0aW5nIjpmYWxzZSwibGFzdFNhdmUiOjE2NDYyODQyMDkzOTksImFycm93SG90a2V5cyI6dHJ1ZSwibW9kVGFiIjpmYWxzZSwibGFzdExldHRlcnNQcmVzc2VkIjpbIiAiLCIgIiwicyIsIiAiLCIgIiwiICIsInMiLCIgIiwiICIsIiAiLCIgIiwiICIsIiAiLCIgIiwiICIsIiAiLCIgIiwiICIsIiAiLCJzIiwiICIsIiAiLCIgIiwiICIsInMiXSwidGFyZ2V0V29yZCI6ImpvaG5zb24iLCJ3b3Jkc1NwZWxsZWQiOjAsImN1cnJlbnRUaW1lIjoxNjQxOTUwNTE3MTIxLCJzaG93QnVpbHRJblNhdmVzIjpmYWxzZSwiZGV2Ijp7fSwic3BhY2VCYXJQYXVzZXMiOnRydWUsInBhdXNlZCI6dHJ1ZSwic2hpZnRBbGlhcyI6ZmFsc2UsImNvbnRyb2xBbGlhcyI6ZmFsc2UsImluZm9ib3hlcyI6eyJhIjp7ImludHJvQm94IjpmYWxzZX19LCJpbmZvLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjkwNjIuNTk1MDAwMDAxNzY2LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sIm9wdGlvbnMtdGFiIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6OTA2Mi41OTUwMDAwMDE3NjYsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwiY2hhbmdlbG9nLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjkwNjIuNTk1MDAwMDAxNzY2LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImEiOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjIuMjE5NjcwMTM0MjY4ODk1NGU5NDEiLCJiZXN0IjoiMi4yMDk0MDY4NzMyODgyOTdlOTQxIiwidG90YWwiOiIyLjIxOTY3MDEzNDI2ODg5NTRlOTQxIiwiYWJ0aW1lIjo5LCJ0aW1lIjo0NDEwLjY1MzAwMDAwMDY0OCwidGltZXMiOjQ0NjYsImF1dG90aW1lcyI6MC4xNTIwMDAwMDAwMDEwMDYyLCJyZXNldFRpbWUiOjQ0MTAuNjUzMDAwMDAwNjQ4LCJmb3JjZVRvb2x0aXAiOnRydWUsImJ1eWFibGVzIjp7IjExIjoiMTQ3MyIsIjEyIjoiODUxIiwiMTMiOiI0NjciLCIyMSI6IjI3MSIsIjIyIjoiMjExIiwiMjMiOiIxNTEiLCIzMSI6Ijk4IiwiMzIiOiI2MiIsIjMzIjoiMzMifSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6WzExLDEyLDEzLDE0LDE1LDIxLDIyLDIzLDI0LDI1LDMxLDMyXSwibWlsZXN0b25lcyI6WzEsMiwzLDRdLCJsYXN0TWlsZXN0b25lIjo0LCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIiLCJhY3RpdmVDaGFsbGVuZ2UiOm51bGx9LCJiIjp7InVubG9ja2VkIjp0cnVlLCJwb2ludHMiOiIxMzAzNDE5LjY4NTk5OTk5NjciLCJiZXN0IjoiMTMwMjQyNy45MjU5OTk5OTY3IiwidG90YWwiOiIyMjA2NDM5LjY4NjAwMDAwMSIsImFidGltZSI6MCwidGltZSI6NDIxLjYzNzAwMDAwMDAwMjMzLCJ0aW1lcyI6MjI0LCJhdXRvdGltZXMiOjAuMzc3MDAwMDAwMDAwMDIzNCwicmVzZXRUaW1lIjo0MjEuNjM3MDAwMDAwMDAyMzMsImZvcmNlVG9vbHRpcCI6dHJ1ZSwiYnV5YWJsZXMiOnt9LCJub1Jlc3BlY0NvbmZpcm0iOmZhbHNlLCJjbGlja2FibGVzIjp7fSwic3BlbnRPbkJ1eWFibGVzIjoiMCIsInVwZ3JhZGVzIjpbMTEsMTIsMTMsMTRdLCJtaWxlc3RvbmVzIjpbMSwyLDMsNF0sImxhc3RNaWxlc3RvbmUiOjQsImFjaGlldmVtZW50cyI6W10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJhY2giOnsidW5sb2NrZWQiOnRydWUsInBvaW50cyI6IjI4IiwiYmVzdCI6IjI4IiwidG90YWwiOiIwIiwiYWJ0aW1lIjowLCJ0aW1lIjowLCJ0aW1lcyI6MCwiYXV0b3RpbWVzIjowLCJoaWRkZW5Sb3dzIjowLCJjbGlja2VkWWVldCI6MCwiY29tcGxldGVkUm93cyI6MywicmVzZXRUaW1lIjo4NzU0LjQ2MjAwMDAwMjQ4LCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnsiMTEiOiIiLCIxMiI6IiIsIjEzIjoiIn0sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOlsxMSwxMiwxMywxNCwxNSwxNiwxNywyMSwyMiwyMywyNCwyNSwyNiwyNywzMSwzMiwzMywzNCwzNSwzNiw0MSw0Miw0MywzNyw2MSw2Miw1MSw2M10sImNoYWxsZW5nZXMiOnt9LCJncmlkIjp7fSwicHJldlRhYiI6IiJ9LCJ0cmVlLXRhYiI6eyJ1bmxvY2tlZCI6dHJ1ZSwidG90YWwiOiIwIiwiYmVzdCI6IjAiLCJyZXNldFRpbWUiOjg3MjQuMjY5MDAwMDAyNTYzLCJmb3JjZVRvb2x0aXAiOmZhbHNlLCJidXlhYmxlcyI6e30sIm5vUmVzcGVjQ29uZmlybSI6ZmFsc2UsImNsaWNrYWJsZXMiOnt9LCJzcGVudE9uQnV5YWJsZXMiOiIwIiwidXBncmFkZXMiOltdLCJtaWxlc3RvbmVzIjpbXSwibGFzdE1pbGVzdG9uZSI6bnVsbCwiYWNoaWV2ZW1lbnRzIjpbXSwiY2hhbGxlbmdlcyI6e30sImdyaWQiOnt9LCJwcmV2VGFiIjoiIn0sImJsYW5rIjp7InVubG9ja2VkIjp0cnVlLCJ0b3RhbCI6IjAiLCJiZXN0IjoiMCIsInJlc2V0VGltZSI6MTQyOC43MDc5OTk5OTk5OTUsImZvcmNlVG9vbHRpcCI6ZmFsc2UsImJ1eWFibGVzIjp7fSwibm9SZXNwZWNDb25maXJtIjpmYWxzZSwiY2xpY2thYmxlcyI6e30sInNwZW50T25CdXlhYmxlcyI6IjAiLCJ1cGdyYWRlcyI6W10sIm1pbGVzdG9uZXMiOltdLCJsYXN0TWlsZXN0b25lIjpudWxsLCJhY2hpZXZlbWVudHMiOltdLCJjaGFsbGVuZ2VzIjp7fSwiZ3JpZCI6e30sInByZXZUYWIiOiIifSwic2F2ZU1lbnVPcGVuIjpmYWxzZX0=",
}

var CUSTOM_SAVES_IDS = Object.keys(CUSTOM_SAVES)
var CUSTOM_SAVE_IDS = CUSTOM_SAVES_IDS //proxy
REORDER = [
        0, 1, 2,
        
            ]

function reorderSaveIds(){
        let a = []
        for (i in REORDER) {
                a.push(CUSTOM_SAVES_IDS[REORDER[i]])
        }
        CUSTOM_SAVES_IDS = a
}

reorderSaveIds()



