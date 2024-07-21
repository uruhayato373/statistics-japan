
from estat_api_formatter.modules import (
    ValueType,
)

def assign_value_ranks(values:list[ValueType]):
      sorted_values = sorted(
          values, key=lambda x: (x["value"] is not None, x["value"]), reverse=True
      )

      rank = 1
      prev_value = None
      for item in sorted_values:
          if item["value"] is None:
              item["rank"] = None
          else:
              if item["value"] != prev_value:
                  prev_value = item["value"]
              item["rank"] = rank
              rank += 1

      return sorted_values
