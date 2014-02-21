#!/lusr/bin/python
import csv
import json
import os
import re
import time
import sys

STUDENT_ID = re.compile(r'^[Ss]?(?P<id>\d+)$')

LOADED_LEVEL = re.compile(r'^loaded level (?P<level>.+)$')
REGISTER_ACTION = re.compile(r'^(set|removed|cleared).+$')
WON_LEVEL = re.compile(r'^won (?P<stars>\d+) stars$')

with open('output.csv', 'wb') as csvFile:
  csvWriter = csv.writer(csvFile)
  for studentDir in os.listdir('.'):
      studentId = re.match(STUDENT_ID, studentDir)
      if os.path.isdir(studentDir and studentId:
          if = studentId.group('id')
              for log in os.listdir(studentDir):
                  # Open file and decode JSON
                  with open(os.path.join(studentDir, log)) as logFile:
                      logJson = json.load(logFile)
                  
                  logJson.pop('id')
                  # Parse JSON into a CSV row with the following columns:
                  #   1. id
                  #   2. level name
                  #   3. start time
                  #   4. number of actions
                  #   5. milliseconds played
                  #   6. milliseconds to win
                  #   7. number of stars received
                  actions = 0
                  startTime = long(log)
                  level = 'unknown'
                  stars = -1
                  winningDuration = -1
                  for timestamp in sorted(logJson.keys()):
                      action = logJson[timestamp].encode('ascii')
                      loadedLevel = re.match(LOADED_LEVEL, action)
                      registerAction = re.match(REGISTER_ACTION, action)
                      wonLevel = re.match(WON_LEVEL, action)
                      if loadedLevel:
                          startTime = long(timestamp)
                          actions = 0
                          level = loadedLevel.group('level')
                      elif registerAction:
                          actions += 1
                      elif wonLevel:
                          newStars = int(wonLevel.group('stars'))
                          if newStars > stars:
                              stars = newStars
                              winningDuration = long(timestamp) - startTime
                  startDate = time.strftime(
                      '%Y-%m-%d %H:%M:%S', time.localtime(startTime / 1000))
                  duration = long(timestamp) - startTime
                  csvWriter.writerow(
                      [id, level, startDate, actions, duration, winningDuration, stars])

